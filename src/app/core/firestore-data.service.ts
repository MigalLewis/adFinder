import { Injectable } from '@angular/core';
import { addDoc, collection, getDocs, limit, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { FirebaseService } from './firebase.service';

export interface ScheduleConfig {
  sourceFolder: string;
  outputFolder: string;
  timeWindowRule: string;
  interval: string;
}

export interface UserInvitePayload {
  email: string;
  role: 'member' | 'admin';
}

@Injectable({ providedIn: 'root' })
export class FirestoreDataService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async addUserInvite(payload: UserInvitePayload): Promise<void> {
    await addDoc(collection(this.firebaseService.firestore, 'userInvites'), {
      ...payload,
      createdAt: serverTimestamp()
    });
  }

  async saveScheduleConfig(config: ScheduleConfig): Promise<void> {
    await addDoc(collection(this.firebaseService.firestore, 'scheduleConfigs'), {
      ...config,
      createdAt: serverTimestamp()
    });
  }

  async saveDetectionRun(payload: { scope: 'all' | 'specific'; hasReferenceAudio: boolean }): Promise<void> {
    await addDoc(collection(this.firebaseService.firestore, 'detectionRuns'), {
      ...payload,
      createdAt: serverTimestamp()
    });
  }

  async getLatestReports(maxResults = 5): Promise<Array<Record<string, unknown>>> {
    const q = query(
      collection(this.firebaseService.firestore, 'summaryReports'),
      orderBy('createdAt', 'desc'),
      limit(maxResults)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
}
