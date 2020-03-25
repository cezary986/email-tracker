import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface UserPasswordModalData {
  title: string;
  password: string;
}

@Component({
  selector: 'app-user-password-modal',
  templateUrl: './user-password-modal.component.html',
  styleUrls: ['./user-password-modal.component.scss']
})
export class UserPasswordModalComponent {

  public password: string;
  public title: string;

  constructor(
    public dialogRef: MatDialogRef<UserPasswordModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserPasswordModalData) {
    this.password = data.password;
    this.title = data.title;
  }
}
