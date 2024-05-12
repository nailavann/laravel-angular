import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {LocalStorageService} from "../services/local-storage.service";

export const adminGuard: CanActivateFn = (route, state) => {
  const localStorageService = inject(LocalStorageService);
  const router = inject(Router);
  const isAdmin = localStorageService.getItem('isAdmin');
  const token = localStorageService.getItem('token');

  console.log(isAdmin);


  if (isAdmin) {
    return true;
  } else {
    if (token) {
      router.navigate(['/home']);
      return false;
    } else {
      router.navigate(['/welcome']);
      return false;
    }
  }

};
