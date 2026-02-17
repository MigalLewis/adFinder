import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  company = '';
  email = '';
  password = '';
  isSubmitting = false;
  errorMessage = '';

  async register(): Promise<void> {
    this.errorMessage = '';
    this.isSubmitting = true;

    try {
      await this.authService.register(this.email, this.password);
      await this.router.navigate(['/dashboard']);
    } catch {
      this.errorMessage = 'Unable to register with these details. Please review and retry.';
    } finally {
      this.isSubmitting = false;
    }
  }
}
