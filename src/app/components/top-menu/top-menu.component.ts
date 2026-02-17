import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-top-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.scss'
})
export class TopMenuComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly signedIn = this.authService.signedIn;

  async signOut(): Promise<void> {
    await this.authService.signOut();
    await this.router.navigate(['/landing']);
  }
}
