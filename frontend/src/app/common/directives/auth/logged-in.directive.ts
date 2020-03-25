import { Directive, TemplateRef, ViewContainerRef, Input, OnDestroy } from '@angular/core';
import { IAppState } from 'src/app/store';
import { Observable, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { select } from '@angular-redux/store';

/**
 * Dyrektywa sprawdzająca czy użytkownik jest zalogowany, jeśli nie ukrywa komponent
 */
@Directive({
  selector: '[appShowIfLoggedIn]'
})
export class LoggedInDirective implements OnDestroy {

  @select((s: IAppState) => s.user.loggedIn) static loggedIn: Observable<boolean>;

  private loggedInExpectedValue = true;
  private ngUnsubscribe: Subject<void> = new Subject();
  private subscription: Subscription = null;

  @Input() set appShowIfLoggedIn(value: boolean) {
    this.loggedInExpectedValue = value;
    if (this.subscription === null) {
      this.subscription = LoggedInDirective.loggedIn
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((loggedIn) => {
          if (loggedIn === this.loggedInExpectedValue) {
            this.viewContainer.createEmbeddedView(this.templateRef);
          } else {
            this.viewContainer.clear();
          }
        });
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}

