import { CanActivateFn } from '@angular/router';
import { BackendService } from '../backend.service';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { map } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const backendService = inject(BackendService);
  const authService = inject(AuthService);
  return backendService.getAdmin(authService.getUid())
    .pipe(map(
      (admin: any) => {
        if (admin) {
          return true;
        } else {
          return false;
        }
      }
    ))
};
