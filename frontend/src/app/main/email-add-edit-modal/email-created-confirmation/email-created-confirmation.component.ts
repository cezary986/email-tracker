import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Email } from 'src/app/common/models/email';
import { environment } from 'src/environments/environment';
import { EmailService } from '../../email-list/service/email.service';

@Component({
  selector: 'app-email-created-confirmation',
  templateUrl: './email-created-confirmation.component.html',
  styleUrls: ['./email-created-confirmation.component.scss']
})
export class EmailCreatedConfirmationComponent {

  @Input() set email(value: Email) {
    if (value !== null) {
      this.emailId = value.id;
      this.emailCode = value.uuid;
      this.copyElementToClipboard(this.generateHtml(value.uuid));
    }
  }

  // tslint:disable-next-line: no-output-native
  @Output() success = new EventEmitter<boolean>();

  public emailId: number;
  public emailCode: string;

  public activated = false;
  public failure = false;

  constructor(
    private emailService: EmailService
  ) { }

  private generateHtml(uuid: string) {
    var image = document.createElement('img') as any;
    image.src = `${environment.apiUrl}email/read/${uuid}`;
    document.body.append(image);
    return image;
  }

  public copyElementToClipboard(element) {
    window.getSelection().removeAllRanges();
    let range = document.createRange();
    range.selectNode(typeof element === 'string' ? document.getElementById(element) : element);
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    document.body.removeChild(element);
  }

  public checkActivation() {
    this.emailService.checkIfActivated(this.emailId)
      .subscribe((res) => {
        this.failure = false;
        this.activated = res;
        if (!this.activated) {
          this.failure = true;
          this.copyElementToClipboard(this.generateHtml(this.emailCode));
        } else {
          this.success.emit(true);
        }
      });
  }
}
