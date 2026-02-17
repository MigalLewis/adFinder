import { Component, Input } from '@angular/core';
import { AdFinding } from '../../models/ad-finding.model';

@Component({
  selector: 'app-detection-results',
  standalone: true,
  templateUrl: './detection-results.component.html',
  styleUrl: './detection-results.component.scss'
})
export class DetectionResultsComponent {
  @Input({ required: true }) findings: AdFinding[] = [];
}
