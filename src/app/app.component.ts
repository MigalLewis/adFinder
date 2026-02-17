import { Component } from '@angular/core';
import { DetectionResultsComponent } from './components/detection-results/detection-results.component';
import { RecordingSourceComponent } from './components/recording-source/recording-source.component';
import { ReferenceAdSearchComponent } from './components/reference-ad-search/reference-ad-search.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { AdFinding } from './models/ad-finding.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TopMenuComponent, RecordingSourceComponent, ReferenceAdSearchComponent, DetectionResultsComponent],
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
