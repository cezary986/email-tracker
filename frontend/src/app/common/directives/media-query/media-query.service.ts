import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from 'src/app/store';
import { SET_SCREEN_SIZE } from './store/actions';
import { ScreenSize } from './store/store';

@Injectable({
  providedIn: 'root'
})
export class MediaQueryService {

  constructor(
    private breakpointObserver: BreakpointObserver,
    private redux: NgRedux<IAppState>
  ) { }

  public init() {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
    ]).subscribe(result => {
      if (result.matches) {
        this.redux.dispatch(SET_SCREEN_SIZE.make(ScreenSize.MOBILE));
      }
    });
    this.breakpointObserver.observe([
      Breakpoints.Small,
    ]).subscribe(result => {
      if (result.matches) {
        this.redux.dispatch(SET_SCREEN_SIZE.make(ScreenSize.TABLET));
      }
    });
    this.breakpointObserver.observe([
      Breakpoints.Medium,
      Breakpoints.Large,
    ]).subscribe(result => {
      if (result.matches) {
        this.redux.dispatch(SET_SCREEN_SIZE.make(ScreenSize.DESKTOP));
      }
    });
  }
}

