import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  username: string | null = '';

  constructor(private auth: AuthService, private router: Router) {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = this.decodeToken(token);
      this.username = decoded?.username || 'Guest';
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      return JSON.parse(decodedPayload);
    } catch (e) {
      console.error('Token decode error', e);
      return null;
    }
  }
}
