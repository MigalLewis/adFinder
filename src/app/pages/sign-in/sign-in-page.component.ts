import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-sign-in-page',
  standalone: true,
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.scss'
})
export class SignInPageComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  signIn(): void {
    this.authService.signIn();
    this.router.navigate(['/dashboard']);
  }
}
