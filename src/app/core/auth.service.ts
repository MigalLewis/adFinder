import { Injectable, signal } from '@angular/core';
import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { FirebaseService } from './firebase.service';
import {
  addDoc,
  collection,
  getDocs,
  limit,
  query,
  serverTimestamp,
  where
} from 'firebase/firestore';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly signedIn = signal(false);
  readonly currentUser = signal<User | null>(null);

  constructor(private readonly firebaseService: FirebaseService) {
    onAuthStateChanged(this.firebaseService.auth, (user) => {
      this.currentUser.set(user);
      this.signedIn.set(Boolean(user));
    });
  }

  async signIn(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(this.firebaseService.auth, email, password);
  }

  async register(companyName: string, email: string, password: string): Promise<void> {
    const normalizedCompanyName = companyName.trim().toLowerCase();

    if (!normalizedCompanyName) {
      throw new Error('Company name is required');
    }

    const credential = await createUserWithEmailAndPassword(this.firebaseService.auth, email, password);
    const user = credential.user;

    const companiesRef = collection(this.firebaseService.firestore, 'companies');
    const existingCompanyQuery = query(
      companiesRef,
      where('normalizedName', '==', normalizedCompanyName),
      limit(1)
    );

    const existingCompanySnapshot = await getDocs(existingCompanyQuery);

    let companyId = '';
    let role: 'admin' | 'member' = 'member';

    if (existingCompanySnapshot.empty) {
      const createdCompany = await addDoc(companiesRef, {
        name: companyName.trim(),
        normalizedName: normalizedCompanyName,
        createdAt: serverTimestamp(),
        createdByUid: user.uid
      });

      companyId = createdCompany.id;
      role = 'admin';

      await addDoc(collection(this.firebaseService.firestore, 'companyScheduleConfigs'), {
        companyId,
        sourceFolder: '',
        outputFolder: '',
        timeWindowRule: 'Find related ads within ±5 minutes',
        interval: 'Every 15 minutes',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        createdByUid: user.uid
      });
    } else {
      companyId = existingCompanySnapshot.docs[0].id;
    }

    await addDoc(collection(this.firebaseService.firestore, 'companyUsers'), {
      companyId,
      uid: user.uid,
      email: user.email,
      role,
      joinedAt: serverTimestamp()
    });
  }

  async signOut(): Promise<void> {
    await signOut(this.firebaseService.auth);
  }
}
