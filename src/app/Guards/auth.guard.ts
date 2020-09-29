import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AuthService} from '../Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      console.log('Token has been found');
      return true;
    } else {
      console.log('Token has not been found');
      this.router.navigate(['/login']);
      return false;
    }
  }

  constructor(private authService: AuthService,
              private router: Router) {
  }

}
