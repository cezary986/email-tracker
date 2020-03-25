import { Component, OnInit, ViewChild } from '@angular/core';
import { select } from '@angular-redux/store';
import { IAppState } from '../store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  @select((s: IAppState) => s.user.loggedIn) loggedIn: Observable<boolean>;
  private readonly NAV_DRAWER_OPENED_COOKIE = 'nav-drawer-opened';

  public sideNaveMode: 'side' | 'over' = 'side';

  constructor(
  ) { }
  
  ngOnInit() { }
}
