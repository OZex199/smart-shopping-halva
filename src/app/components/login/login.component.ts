import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private api: ApiService, private auth: AuthService, private router: Router) {}

  ngOnInit() {
    // ✅ Check window exists (client-side only)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        this.router.navigate(['/dashboard']);
      }
    }
  }

  login() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Username and password are required.';
      return;
    }
  
    console.log('🛰️ Sending login request:', { username: this.username, password: this.password });
  
    this.api.login({ username: this.username, password: this.password }).subscribe({
      next: (res) => {
        console.log('✅ Login success, token:', res.token);
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', res.token);
        }
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('❌ Login error:', err);
        this.errorMessage = 'Invalid username or password.';
      }
    });
  }
  
}
