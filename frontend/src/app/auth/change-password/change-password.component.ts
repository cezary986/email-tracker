import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { passwordRepeatValidator } from 'src/app/common/forms/validators';
import { AuthService } from '../service/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { NotifierService } from 'angular-notifier';
import { NotificationTypes } from '../../common/const';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  public form: FormGroup = null;
  public hasError = false;

  constructor(
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    private formBuilder: FormBuilder,
    private translateService: TranslateService,
    private notifier: NotifierService,
    private authService: AuthService
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  private createForm() {
    const repeatNewPassword = new FormControl(null, [Validators.required]);
    this.form = this.formBuilder.group({
      oldPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required, Validators.minLength(8), passwordRepeatValidator(repeatNewPassword)]],
    });
    repeatNewPassword.valueChanges.subscribe((res) => {
      this.form.controls.newPassword.updateValueAndValidity();
    });
    this.form.addControl('repeatNewPassword', repeatNewPassword);
  }

  public onSubmit() {
    this.hasError = false;
    this.changePassword();
  }

  public onCancelClick() {
    this.dialogRef.close();
  }

  private changePassword() {
    this.authService.changePassword(this.form.value.oldPassword, this.form.value.newPassword)
      .subscribe((res) => {
        this.notifier.notify(NotificationTypes.SUCCESS, this.translateService.instant('change_password.toasts.success'));
        this.dialogRef.close();
      }, error => {
        // niepoprawne hasło
        if (error.status === 400) {
          this.hasError = true;
        } else {
          throw error;
        }
      });
  }

}
