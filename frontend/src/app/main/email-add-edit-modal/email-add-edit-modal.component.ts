import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Email } from 'src/app/common/models/email';
import { EmailService } from '../email-list/service/email.service';

export interface EmailAddEditModalData {
  mode: 'add' | 'edit';
  email: Email;
}

@Component({
  selector: 'app-email-add-edit-modal',
  templateUrl: './email-add-edit-modal.component.html',
  styleUrls: ['./email-add-edit-modal.component.scss']
})
export class EmailAddEditModalComponent implements OnInit {

  public form: FormGroup = null;
  public step = 'form' || 'confirmation';

  public createdEmail: Email = null;

  public confirmationSuccess = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EmailAddEditModalData,
    public dialogRef: MatDialogRef<EmailAddEditModalData>,
    private formBuilder: FormBuilder,
    public emailService: EmailService
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  private createForm() {
    this.form = this.formBuilder.group({
      addressee: [null, [Validators.required, Validators.email]],
      title: [null, [Validators.required]]
    });
  }

  public onSubmit() {
    const email: Email = {
      id: null,
      user: null,
      uuid: null,
      activated: null,
      addressee: [
        {
          id: null,
          email_address: this.form.value.addressee
        }
      ],
      created: null,
      first_opened: null,
      last_opened: null,
      title: this.form.value.title,
      description: null
    };
    this.emailService.createEmail(email)
    .subscribe((res) => {
      this.createdEmail = res;
      this.step = 'confirmation';
    });
  }

  public onCancelClick() {
    this.dialogRef.close(false);
  }

  public onOkClick() {
    this.dialogRef.close(true);
  }

}
