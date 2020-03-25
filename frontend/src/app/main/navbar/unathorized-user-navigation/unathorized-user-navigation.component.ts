import { Component, OnInit } from '@angular/core';
import { APP_ROUTES } from 'src/app/app-routing.module';

@Component({
  selector: 'app-unathorized-user-navigation',
  templateUrl: './unathorized-user-navigation.component.html',
  styleUrls: ['./unathorized-user-navigation.component.scss']
})
export class UnathorizedUserNavigationComponent implements OnInit {

  public tablesUrl = APP_ROUTES.leagues.table.url();
  public scheduleUrl = APP_ROUTES.schedule.league.url();

  constructor() { }

  ngOnInit() {
  }

}
