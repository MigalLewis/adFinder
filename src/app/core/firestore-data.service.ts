import { Injectable, signal } from '@angular/core';
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

type RequestStatus = 'idle' | 'loading' | 'success' | 'error';

@Injectable({ providedIn: 'root' })
export class FirestoreDataService {
  readonly addUserInviteStatus = signal<RequestStatus>('idle');
  readonly saveScheduleConfigStatus = signal<RequestStatus>('idle');
  readonly saveDetectionRunStatus = signal<RequestStatus>('idle');
  readonly latestReportsStatus = signal<RequestStatus>('idle');
  readonly latestReports = signal<Array<Record<string, unknown>>>([]);

  constructor(private readonly firebaseService: FirebaseService) {}

  addUserInvite(payload: UserInvitePayload): void {
    this.addUserInviteStatus.set('loading');

    addDoc(collection(this.firebaseService.firestore, 'userInvites'), {
      ...payload,
      createdAt: serverTimestamp()
    })
      .then(() => {
        this.addUserInviteStatus.set('success');
      })
      .catch(() => {
        this.addUserInviteStatus.set('error');
      });
  }

  saveScheduleConfig(config: ScheduleConfig): void {
    this.saveScheduleConfigStatus.set('loading');

    addDoc(collection(this.firebaseService.firestore, 'scheduleConfigs'), {
      ...config,
      createdAt: serverTimestamp()
    })
      .then(() => {
        this.saveScheduleConfigStatus.set('success');
      })
      .catch(() => {
        this.saveScheduleConfigStatus.set('error');
      });
  }

  saveDetectionRun(payload: { scope: 'all' | 'specific'; hasReferenceAudio: boolean }): void {
    this.saveDetectionRunStatus.set('loading');

    addDoc(collection(this.firebaseService.firestore, 'detectionRuns'), {
      ...payload,
      createdAt: serverTimestamp()
    })
      .then(() => {
        this.saveDetectionRunStatus.set('success');
      })
      .catch(() => {
        this.saveDetectionRunStatus.set('error');
      });
  }

  loadLatestReports(maxResults = 5): void {
    this.latestReportsStatus.set('loading');

    const q = query(
      collection(this.firebaseService.firestore, 'summaryReports'),
      orderBy('createdAt', 'desc'),
      limit(maxResults)
    );

    getDocs(q)
      .then((snapshot) => {
        this.latestReports.set(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        this.latestReportsStatus.set('success');
      })
      .catch(() => {
        this.latestReportsStatus.set('error');
      });
  }
}
