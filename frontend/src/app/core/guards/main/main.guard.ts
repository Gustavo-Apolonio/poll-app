import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../../services';

@Injectable({
  providedIn: 'root',
})
export class MainGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const hasPoll: boolean = this.authService.hasPoll;
    const hasUserId: boolean = this.authService.hasUserId;

    if (hasPoll && hasUserId) {
      return true;
    }

    this.router.navigateByUrl('/login');
    return false;
  }
}
