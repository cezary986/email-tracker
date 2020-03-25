import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from 'src/app/store';
import { APP_ROUTES } from 'src/app/app-routing.module';
import { UserRole } from 'src/app/common/models/user-role-response';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private redux: NgRedux<IAppState>
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    if (this.redux.getState().user.loggedIn !== true) {
      this.router.navigate([APP_ROUTES.login.url()]);
      return false;
    }
    const roles = route.data.roles as Array<UserRole>;
    return (roles.indexOf(this.redux.getState().user.role) >= 0);
  }
}
