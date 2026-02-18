import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FirestoreDataService } from '../../core/firestore-data.service';

type SettingsTab = 'users' | 'schedule';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss'
})
export class SettingsPageComponent {
  private readonly firestoreData = inject(FirestoreDataService);

  activeTab: SettingsTab = 'users';

  sourceFolder = '';
  outputFolder = '';
  timeWindowRule = 'Find related ads within ±5 minutes';
  checkInterval = 'Every 15 minutes';
  isSaving = false;
  statusMessage = '';

  inviteEmail = '';
  inviteRole: 'member' | 'admin' = 'member';
  isInviting = false;
  usersStatusMessage = '';

  setActiveTab(tab: SettingsTab): void {
    this.activeTab = tab;
  }

  async addUser(): Promise<void> {
    this.isInviting = true;
    this.usersStatusMessage = '';

    try {
      await this.firestoreData.addUserInvite({
        email: this.inviteEmail.trim(),
        role: this.inviteRole
      });

      this.inviteEmail = '';
      this.inviteRole = 'member';
      this.usersStatusMessage = 'User invite saved. They can be linked to your company during onboarding.';
    } catch {
      this.usersStatusMessage = 'Unable to add user. Check Firebase configuration and try again.';
    } finally {
      this.isInviting = false;
    }
  }

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
