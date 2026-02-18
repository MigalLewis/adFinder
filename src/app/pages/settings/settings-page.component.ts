import { Component, effect, inject } from '@angular/core';
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
  statusMessage = '';

  inviteEmail = '';
  inviteRole: 'member' | 'admin' = 'member';
  usersStatusMessage = '';

  readonly isSaving = this.firestoreData.saveScheduleConfigStatus;
  readonly isInviting = this.firestoreData.addUserInviteStatus;

  constructor() {
    effect(() => {
      const inviteStatus = this.firestoreData.addUserInviteStatus();

      if (inviteStatus === 'success') {
        this.inviteEmail = '';
        this.inviteRole = 'member';
        this.usersStatusMessage = 'User invite saved. They can be linked to your company during onboarding.';
      }

      if (inviteStatus === 'error') {
        this.usersStatusMessage = 'Unable to add user. Check Firebase configuration and try again.';
      }
    });

    effect(() => {
      const scheduleStatus = this.firestoreData.saveScheduleConfigStatus();

      if (scheduleStatus === 'success') {
        this.statusMessage = 'Schedule saved to Firestore.';
      }

      if (scheduleStatus === 'error') {
        this.statusMessage = 'Unable to save schedule. Check Firebase configuration and try again.';
      }
    });
  }

  setActiveTab(tab: SettingsTab): void {
    this.activeTab = tab;
  }

  addUser(): void {
    this.usersStatusMessage = '';

    this.firestoreData.addUserInvite({
      email: this.inviteEmail.trim(),
      role: this.inviteRole
    });
  }

  saveSchedule(): void {
    this.statusMessage = '';

    this.firestoreData.saveScheduleConfig({
      sourceFolder: this.sourceFolder,
      outputFolder: this.outputFolder,
      timeWindowRule: this.timeWindowRule,
      interval: this.checkInterval
    });
  }
}
