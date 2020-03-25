import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EmailAddEditModalComponent } from '../email-add-edit-modal/email-add-edit-modal.component';
import { EmailService } from './service/email.service';
import { Email } from 'src/app/common/models/email';

@Component({
  selector: 'app-email-list',
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.scss']
})
export class EmailListComponent implements OnInit {
  
  public searchQuery: string;

  constructor(
    public dialog: MatDialog,
    private emailService: EmailService
  ) { }

  public emails: Email[] = null;

  ngOnInit() {
    this.fetchEmails();
  }

  public fetchEmails() {
    this.emailService.getEmails()
    .subscribe((emails) => {
      this.emails = emails;
    });
  }

  public onAddEmailClick() {
    const dialogRef = this.dialog.open(EmailAddEditModalComponent, {
      width: '250px',
      data: {
        mode: 'add',
        email: null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.emails = null;
        this.fetchEmails();
      }
    });
  }
}
