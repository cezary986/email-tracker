import { BrowserModule } from '@angular/platform-browser';
import { NgModule, isDevMode, ErrorHandler, LOCALE_ID } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgRedux, DevToolsExtension, NgReduxModule } from '@angular-redux/store';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IAppState, rootReducer, INITIAL_STATE } from './store';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { AppInterceptor } from './common/interceptor/app-interceptor';
import { NotifierModule } from 'angular-notifier';
import { AppErrorHandler } from './common/errors/app-error-handler';
import { MAT_DATE_LOCALE } from '@angular/material';
import localePl from '@angular/common/locales/pl';
import { registerLocaleData } from '@angular/common';
import { MediaQueryModule } from './common/directives/media-query/media-query.module';

registerLocaleData(localePl);


export function translationFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function jwtFactory() {
  return localStorage.getItem(environment.auth.accessTokenKey);
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MediaQueryModule,

    NotifierModule.withConfig({
      theme: 'material',
      position: {
        horizontal: {
          position: 'right'
        }
      }
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translationFactory,
        deps: [HttpClient]
      },
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: jwtFactory,
        whitelistedDomains: environment.auth.whiteListedDomains
      }
    }),
    NgReduxModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AppInterceptor,
    multi: true
  },
  { provide: LOCALE_ID, useValue: 'pl' },
  { provide: MAT_DATE_LOCALE, useValue: 'pl' },
  { provide: ErrorHandler, useClass: AppErrorHandler }],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    private translateService: TranslateService,
    ngRedux: NgRedux<IAppState>,
    devTools: DevToolsExtension
  ) {
    this.translateService.setDefaultLang('pl');
    this.translateService.use('pl');

    const enhancers = (isDevMode() && devTools.isEnabled()) ? [devTools.enhancer()] : [];
    ngRedux.configureStore(rootReducer, INITIAL_STATE, [], enhancers);
  }
}

// platformBrowserDynamic().bootstrapModule(AppModule);
