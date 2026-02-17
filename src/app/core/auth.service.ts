import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly signedIn = signal(false);

  signIn(): void {
    this.signedIn.set(true);
  }

  register(): void {
    this.signedIn.set(true);
  }

  signOut(): void {
    this.signedIn.set(false);
  }
}
