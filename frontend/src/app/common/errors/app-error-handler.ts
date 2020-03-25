import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { AuthService } from 'src/app/auth/service/auth.service';
import { NotificationTypes } from '../const';

export class AppError extends Error {
    constructor(public code: string, message: string = null) {
        super(message);
    }
}

@Injectable()
export class AppErrorHandler implements ErrorHandler {

    constructor(
        private notifier: NotifierService,
        private translate: TranslateService,
        private zone: NgZone,
        private authService: AuthService
    ) { }

    handleError(error) {
        if (error instanceof HttpErrorResponse) { 
            const httpError: HttpErrorResponse = error;

            switch (httpError.status) {
                case 401:
                    // TODO refresh token
                    this.authService.logout();
                    break;
                case 403:
                    this.zone.run(() => {
                        this.notifier.notify(NotificationTypes.ERROR, this.translate.instant('toasts.errors.403'));
                    });
                    break;
                case 404:
                    this.zone.run(() => {
                        this.notifier.notify(NotificationTypes.ERROR, this.translate.instant('toasts.errors.404'));
                    });
                    break;
                case 500:
                    this.zone.run(() => {
                        this.notifier.notify(NotificationTypes.ERROR, this.translate.instant('toasts.errors.500'));
                    });
                    break;
                default:
                    this.zone.run(() => {
                        this.notifier.notify(NotificationTypes.ERROR, this.translate.instant('toasts.errors.500'));
                    });
                    break;
            }
        } else {
            this.notifier.notify(NotificationTypes.ERROR, this.translate.instant('toasts.errors.app_error'));
        }
        console.error(error);
    }
}
