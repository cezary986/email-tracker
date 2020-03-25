import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginResponse } from 'src/app/common/models/login-response';
import { map, first } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from 'src/app/store';
import { SET_USER_USERNAME } from '../store/actions';
import { ApiEndpoints } from 'src/app/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private jwtService: JwtHelperService,
    private redux: NgRedux<IAppState>,
  ) { }


  public login(username: string, password: string): Observable<void> {

    return this.http.post<LoginResponse>(
      ApiEndpoints.login(),
      {
        username,
        password
      },
      { withCredentials: true })
      .pipe(map((response) => {
        // zapisanie tokenów w ciasteczkach
        localStorage.setItem(environment.auth.accessTokenKey, response.access);
        localStorage.setItem(environment.auth.refreshTokenKey, response.refresh);
        const tokenData = this.jwtService.decodeToken(response.access);
        return;
      }));
  }

  public logout() {
    // usunięcie tokenów w ciasteczkach
    localStorage.removeItem(environment.auth.accessTokenKey);
    localStorage.removeItem(environment.auth.refreshTokenKey);
  }

  public registerMachine() {
    this.http.get(ApiEndpoints.registerMachine()).subscribe((res) => {
      console.log(res);
    });
  }

  public getProfile() {
    this.http.get(ApiEndpoints.profile())
      .subscribe(res => {
        this.redux.dispatch(SET_USER_USERNAME.make((res as any).username));
      });
  }

  public refreshToken(refreshToken?: string): Observable<boolean> {
    let result: Observable<boolean>;
    if (refreshToken === undefined) {
      refreshToken = localStorage.getItem(environment.auth.refreshTokenKey);
    }
    // TODO wymienić token
    result = new BehaviorSubject<boolean>(false);
    // this.logout();
    return result;
  }

  public changePassword(oldPassword: string, newPassword: string): Observable<void> {
    const body = new URLSearchParams();
    body.set('oldPassword', oldPassword);
    body.set('newPassword', newPassword);

    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    return this.http.put<void>(ApiEndpoints.changePassword(), body.toString(), options);
  }

  /**
   * Sprawdza stan zalogowania na starcie aplikacji
   */
  checkInitialLoggedIn() {
    let result: Observable<boolean>;
    const accesToken = localStorage.getItem(environment.auth.accessTokenKey);
    const refreshToken = localStorage.getItem(environment.auth.refreshTokenKey);

    if (accesToken !== null && refreshToken !== null) {
      if (this.jwtService.isTokenExpired(accesToken)) {
        // acces token wygasł - próbujemy refreshować
        return this.refreshToken();
      } else {
        // wszystko ok
        result = new BehaviorSubject<boolean>(true);
      }
    } else {
      result = new BehaviorSubject<boolean>(false);
      this.logout();
    }
    result.pipe(first()).subscribe((loggedIn) => {
      if (loggedIn) {
        const tokenData = this.jwtService.decodeToken(accesToken);
        this.redux.dispatch(SET_USER_USERNAME.make(tokenData.user_name));
      }
    });
    return result;
  }
}
