import { Component } from '@angular/core';

interface AdFinding {
  timestamp: string;
  title: string;
  confidence: number;
  contextWindow: string;
  channel: string;
  status: 'Matched reference ad' | 'Related ad in ±5 minute window';
}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  readonly title = 'AdFinder Analytics Console';

  readonly findings: AdFinding[] = [
    {
      timestamp: '00:14:32',
      title: 'Spark Mobile - Unlimited Plan',
      confidence: 98,
      contextWindow: '-00:03:10 / +00:05:00',
      channel: 'Sports Network A',
      status: 'Matched reference ad'
    },
    {
      timestamp: '00:16:08',
      title: 'DriveFresh Car Care',
      confidence: 91,
      contextWindow: '-00:05:00 / +00:02:42',
      channel: 'Sports Network A',
      status: 'Related ad in ±5 minute window'
    },
    {
      timestamp: '01:05:44',
      title: 'PeakBank Business Rewards',
      confidence: 95,
      contextWindow: '-00:04:12 / +00:05:00',
      channel: 'News Channel 24',
      status: 'Matched reference ad'
    }
  ];
}
