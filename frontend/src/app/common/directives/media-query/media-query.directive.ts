import { Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { select } from '@angular-redux/store';
import { IAppState } from 'src/app/store';
import { Observable, Subject, Subscription } from 'rxjs';
import { ScreenSize } from './store/store';
import { takeUntil } from 'rxjs/operators';

/**
 * Dyrektywa ukrywająca lub pokazująca dany element w zależności od media query
 */
@Directive({
  selector: '[appMediaVisible]'
})
export class MediaQueryDirective implements OnDestroy {


  @select((s: IAppState) => s.media) static screenSize: Observable<ScreenSize>;

  private expectedScreenSizes: string[] = null;
  private ngUnsubscribe: Subject<void> = new Subject();
  private subscription: Subscription = null;

  @Input() set appMediaVisible(screenSizes: ScreenSize[]) {
    this.expectedScreenSizes = screenSizes;
    if (this.subscription === null) {
      this.subscription = MediaQueryDirective.screenSize
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((screenSize: ScreenSize) => {
          this.checkScreenSize(screenSize);
        });
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private checkScreenSize(screenSize: ScreenSize) {
    if (this.expectedScreenSizes === null || this.expectedScreenSizes === undefined) {
      throw new Error('"appMediaVisible" directive requires an array of expected screen sized. None was supplied');
    }

    if (this.expectedScreenSizes.indexOf(screenSize) >= 0) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
