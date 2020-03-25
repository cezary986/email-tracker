import { Component } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AuthService } from './auth/service/auth.service';
import { IAppState } from './store';
import { SET_USER_LOGGED_IN, SET_USER_ROLE } from './auth/store/actions';
import { map } from 'rxjs/operators';
import { MediaQueryService } from './common/directives/media-query/media-query.service';
import { Router } from '@angular/router';
import { APP_ROUTES } from './app-routing.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private authService: AuthService,
    private redux: NgRedux<IAppState>,
    private mediaQueryService: MediaQueryService,
    private router: Router
  ) {
    // sprawdzenie czy na starcie użytkownik nie jest zalogowany
    // + pobranie jego roli
    this.authService.checkInitialLoggedIn()
      .pipe(map((loggedIn) => {
        if (!loggedIn) {
          this.router.navigateByUrl(APP_ROUTES.login.url());
        } else {
          this.authService.getProfile();
          this.authService.registerMachine();
        }
        return loggedIn;
      }))
      .subscribe(loggedIn => {
        this.redux.dispatch(SET_USER_LOGGED_IN.make(loggedIn));
      });
    this.mediaQueryService.init();
  }
}
