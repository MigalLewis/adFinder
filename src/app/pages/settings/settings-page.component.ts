import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FirestoreDataService } from '../../core/firestore-data.service';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss'
})
export class SettingsPageComponent {
  private readonly firestoreData = inject(FirestoreDataService);

  sourceFolder = '';
  outputFolder = '';
  timeWindowRule = 'Find related ads within ±5 minutes';
  checkInterval = 'Every 15 minutes';
  isSaving = false;
  statusMessage = '';

  async saveSchedule(): Promise<void> {
    this.isSaving = true;
    this.statusMessage = '';

    try {
      await this.firestoreData.saveScheduleConfig({
        sourceFolder: this.sourceFolder,
        outputFolder: this.outputFolder,
        timeWindowRule: this.timeWindowRule,
        interval: this.checkInterval
      });

      this.statusMessage = 'Schedule saved to Firestore.';
    } catch {
      this.statusMessage = 'Unable to save schedule. Check Firebase configuration and try again.';
    } finally {
      this.isSaving = false;
    }
  }
}
