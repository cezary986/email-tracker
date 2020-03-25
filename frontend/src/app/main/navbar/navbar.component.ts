import { Component, Output, EventEmitter } from '@angular/core';
import { APP_ROUTES } from 'src/app/app-routing.module';
import { Observable } from 'rxjs';
import { select, } from '@angular-redux/store';
import { IAppState } from 'src/app/store';
import { UserRole } from 'src/app/common/models/user-role-response';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @select((s: IAppState) => s.user.loggedIn) loggedIn: Observable<boolean>;

  @Output() menuButtonClick: EventEmitter<void> = new EventEmitter();

  public loginRoute = APP_ROUTES.login.url();

  constructor() { }
}
