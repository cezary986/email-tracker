import { Component, OnInit } from '@angular/core';
import { IAppState } from 'src/app/store';
import { Observable } from 'rxjs';
import { select, NgRedux } from '@angular-redux/store';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Router } from '@angular/router';
import { APP_ROUTES } from 'src/app/app-routing.module';
import { SET_USER_LOGGED_IN } from 'src/app/auth/store/actions';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from 'src/app/auth/change-password/change-password.component';

@Component({
  selector: 'app-user-popup',
  templateUrl: './user-popup.component.html',
  styleUrls: ['./user-popup.component.scss']
})
export class UserPopupComponent implements OnInit {

  @select((s: IAppState) => s.user.profile) profile: Observable<any>;
  public showPopup = false;

  constructor(
    private authService: AuthService,
    private redux: NgRedux<IAppState>,
    private router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  public onPopupClick(event: Event) {
    event.stopPropagation();
  }

  public onLogoutClick() {
    this.authService.logout();
    this.redux.dispatch(SET_USER_LOGGED_IN.make(false));
    this.router.navigate([APP_ROUTES.home.url()]);
  }

  public onChangePasswordClick() {
    this.dialog.open(ChangePasswordComponent);
  }

}
