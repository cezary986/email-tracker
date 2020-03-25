import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailAddEditModalComponent } from './email-add-edit-modal.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { FormsDirectivesModule } from 'src/app/common/directives/forms/forms-directives.module';
import { FormErrorModule } from 'src/app/common/forms/form-error/form-error.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmailCreatedConfirmationComponent } from './email-created-confirmation/email-created-confirmation.component';



@NgModule({
  declarations: [
    EmailAddEditModalComponent,
    EmailCreatedConfirmationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FormErrorModule,
    FormsDirectivesModule,

    TranslateModule,

    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  entryComponents: [
    EmailAddEditModalComponent
  ],
  exports: [
    EmailAddEditModalComponent
  ]
})
export class EmailAddEditModalModule { }
