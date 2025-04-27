import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';

export const config = [
  provideRouter(routes),
  provideHttpClient(withFetch()),
];
