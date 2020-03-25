import { Component, OnInit, ViewChild } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { TranslateService } from '@ngx-translate/core';
import { NotificationTypes } from '../../const';

@Component({
  selector: 'app-copy-to-clipboard',
  templateUrl: './copy-to-clipboard.component.html',
  styleUrls: ['./copy-to-clipboard.component.scss']
})
export class CopyToClipboardComponent implements OnInit {

  @ViewChild('content', null) contentElement: any;

  constructor(
    private notifier: NotifierService,
    private translate: TranslateService
  ) { }

  ngOnInit() {}

  public onCopyToClipboardClick() {
    const copyText = this.contentElement.nativeElement;
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(copyText);
    selection.removeAllRanges();
    selection.addRange(range);
    /* Copy the text inside the text field */
    document.execCommand('copy');
    this.notifier.notify(NotificationTypes.INFO, this.translate.instant('copy_to_clipboard.notification'));
  }

}
