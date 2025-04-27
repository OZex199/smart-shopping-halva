import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  private getStorage(): Storage | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage;
    }
    return null;
  }

  get isLoggedIn(): boolean {
    const storage = this.getStorage();
    return !!storage?.getItem('token');
  }

  logout() {
    const storage = this.getStorage();
    storage?.removeItem('token');
  }
}
