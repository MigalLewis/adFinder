import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FirestoreDataService } from '../../core/firestore-data.service';

interface SummaryReport {
  generatedAt: string;
  profile: string;
  recordingsProcessed: number;
  adsDetected: number;
}

interface DetectionPreview {
  timestamp: string;
  title: string;
  channel: string;
  confidence: number;
}

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent {
  private readonly firestoreData = inject(FirestoreDataService);

  readonly title = 'AdFinder Analytics Console';

  detectionScope: 'all' | 'specific' = 'all';
  detectionMessage = '';

  readonly summaryReports: SummaryReport[] = [
    {
      generatedAt: 'Today, 09:30',
      profile: 'Morning Sports Sweep',
      recordingsProcessed: 24,
      adsDetected: 163
    },
    {
      generatedAt: 'Yesterday, 18:15',
      profile: 'Prime-Time Broadcasts',
      recordingsProcessed: 41,
      adsDetected: 279
    },
    {
      generatedAt: 'Yesterday, 07:10',
      profile: 'News Channel Monitoring',
      recordingsProcessed: 18,
      adsDetected: 121
    }
  ];

  async runDetection(): Promise<void> {
    this.detectionMessage = '';

    try {
      await this.firestoreData.saveDetectionRun({
        scope: this.detectionScope,
        hasReferenceAudio: this.detectionScope === 'specific'
      });
      this.detectionMessage = 'Detection request saved to Firestore.';
    } catch {
      this.detectionMessage = 'Could not save detection request. Check Firebase configuration.';
    }
  }

  readonly detectionResults: DetectionPreview[] = [
    {
      timestamp: '00:14:32',
      title: 'Spark Mobile - Unlimited Plan',
      channel: 'Sports Network A',
      confidence: 98
    },
    {
      timestamp: '00:16:08',
      title: 'DriveFresh Car Care',
      channel: 'Sports Network A',
      confidence: 91
    },
    {
      timestamp: '01:05:44',
      title: 'PeakBank Business Rewards',
      channel: 'News Channel 24',
      confidence: 95
    }
  ];
}
