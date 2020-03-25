import { Directive, Input, TemplateRef, ViewContainerRef, OnDestroy } from '@angular/core';
import { IAppState } from 'src/app/store';
import { select } from '@angular-redux/store';
import { Observable, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserRole } from '../../models/user-role-response';

/**
 * Dyrektywa sprawdzająca czy rola użytkownika jest odpowiednia aby zobaczyć dany
 * komponent. Dyrektywie przekazywana jest tablica dostępnych ról dla któych komponent
 * powinien być widoczny
 */
@Directive({
  selector: '[appShowIfRoleIn]'
})
export class RoleDirective implements OnDestroy {

  @select((s: IAppState) => s.user.role) static role: Observable<string>;

  private expectedRoles: string[] = null;
  private ngUnsubscribe: Subject<void> = new Subject();
  private subscription: Subscription = null;

  @Input() set appShowIfRoleIn(expectedRoles: string[]) {
    this.expectedRoles = expectedRoles;
    if (this.subscription === null) {
      this.subscription = RoleDirective.role
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((userRole: UserRole) => {

          this.checkUserRole(userRole);
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

  private checkUserRole(userRole: UserRole) {
    if (this.expectedRoles === null || this.expectedRoles === undefined) {
      throw new Error('"appShowIfRoleIn" directive requires an array of roles. None was supplied');
    }
    if (this.expectedRoles.indexOf(userRole) >= 0) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
