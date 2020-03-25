import { Component, OnDestroy } from '@angular/core';
import { Router, RouterEvent, NavigationEnd, NavigationStart, NavigationCancel, NavigationError } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-app-loader',
  templateUrl: './app-loader.component.html',
  styleUrls: ['./app-loader.component.scss']
})
export class AppLoaderComponent implements OnDestroy {

  public isVisible = true;
  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(
    private router: Router
  ) {

    this.setupAppLoader();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private setupAppLoader() {
    this.router.events
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((event: RouterEvent) => {
        if (event instanceof NavigationStart) {
          this.isVisible = true;
          return;
        }
        if (event instanceof NavigationEnd) {
          this.isVisible = false;
          return;
        }
        if (event instanceof NavigationCancel) {
          this.isVisible = false;
          return;
        }
        if (event instanceof NavigationError) {
          this.isVisible = false;
          return;
        }
      });
  }
}
