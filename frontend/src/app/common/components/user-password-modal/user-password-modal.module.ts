import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPasswordModalComponent } from './user-password-modal.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { CopyToClipboardModule } from '../copy-to-clipboard/copy-to-clipboard.module';


@NgModule({
  declarations: [
    UserPasswordModalComponent
  ],
  imports: [
    CommonModule,

    CopyToClipboardModule,
    TranslateModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
  entryComponents: [
    UserPasswordModalComponent
  ],
  exports: [
    UserPasswordModalComponent
  ]
})
export class UserPasswordModalModule {
}
