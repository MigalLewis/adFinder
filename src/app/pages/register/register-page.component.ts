import { Component, inject, signal } from '@angular/core';
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
  readonly isSubmitting = signal(false);
  readonly errorMessage = signal('');

  register(company: string, email: string, password: string): void {
    this.errorMessage.set('');
    this.isSubmitting.set(true);

    this.authService
      .register(company, email, password)
      .then(() => this.router.navigate(['/dashboard']))
      .catch(() => {
        this.errorMessage.set('Unable to register with these details. Please review and retry.');
      })
      .finally(() => {
        this.isSubmitting.set(false);
      });
  }
}
