import { Injectable, signal } from '@angular/core';
import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { FirebaseService } from './firebase.service';

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

  async register(email: string, password: string): Promise<void> {
    await createUserWithEmailAndPassword(this.firebaseService.auth, email, password);
  }

  async signOut(): Promise<void> {
    await signOut(this.firebaseService.auth);
  }
}
