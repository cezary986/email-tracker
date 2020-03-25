import { Component, OnInit } from '@angular/core';
import { IAppState } from 'src/app/store';
import { select, NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { APP_ROUTES } from 'src/app/app-routing.module';
import { SET_USER_LOGGED_IN, SET_USER_ROLE } from '../store/actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @select((s: IAppState) => s.user.loggedIn) loggedIn: Observable<boolean>;

  public loading = false;
  public loginForm: FormGroup;
  public hasError = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private redux: NgRedux<IAppState>
  ) { }

  ngOnInit() {
    this.loggedIn.subscribe((loggedIn) => {
      if (loggedIn) {
        this.router.navigate([APP_ROUTES.home.url()]);
      }
    });
    this.createLoginForm();
  }

  private createLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', [
        Validators.required,
        Validators.maxLength(100)
      ]],
      password: ['', [
        Validators.required,
        Validators.maxLength(100)
      ]],
    });
  }

  public onSubmit() {
    if (this.loginForm.valid && !this.loading) {
      this.loading = true;

      this.hasError = false;
      this.authService.login(
        this.loginForm.value.username,
        this.loginForm.value.password)
        .subscribe(res => {
          this.router.navigate([APP_ROUTES.home.url()]);
          this.redux.dispatch(SET_USER_LOGGED_IN.make(true));
        }, error => {
          if (error.status === 401 || error.status === 400) {
            this.resetForm();
            this.hasError = true;
          }
        })
        .add(this.resetForm);
    }
  }

  private resetForm() {
    if (this.loginForm !== undefined) {
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key).setErrors(null);
      });
      this.loginForm.reset();
      this.loading = false;
    }
  }
}
