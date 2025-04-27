import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  styleUrls: ['./app.component.css'] ,
  template: `
    <div *ngIf="isLoggedIn">
      <nav>
        <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
        <a routerLink="/transactions" routerLinkActive="active">Transactions</a>
        <a routerLink="/recommendations" routerLinkActive="active">Recommendations</a>
        <a routerLink="/partners" routerLinkActive="active">Partners</a>
        <a routerLink="/profile" routerLinkActive="active">Profile</a>
      </nav>
    </div>

    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  [x: string]: any;
  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  get isLoggedIn() {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('token');
    }
    return false;
  }
}
