import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-sign-in-page',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.scss'
})
export class SignInPageComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  email = '';
  password = '';
  isSubmitting = false;
  errorMessage = '';

  async signIn(): Promise<void> {
    this.errorMessage = '';
    this.isSubmitting = true;

    try {
      await this.authService.signIn(this.email, this.password);
      await this.router.navigate(['/dashboard']);
    } catch {
      this.errorMessage = 'Unable to sign in. Please check your credentials and try again.';
    } finally {
      this.isSubmitting = false;
    }
  }
}
