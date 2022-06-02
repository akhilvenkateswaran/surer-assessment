import { CommonModule } from '@angular/common';  
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CreateNewEventComponent } from './create-new-event.component';
import { SubEventDialogComponent } from './add-sub-event-dialog/sub-event-dialog.component';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import {
  NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbWindowModule,
  NbWindowService
} from '@nebular/theme'

@NgModule({
  imports: [
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    Ng2SmartTableModule,
    FormsModule,
    NbWindowModule.forChild(),
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [
    CreateNewEventComponent,
    SubEventDialogComponent
  ],
  providers:[NbWindowService]

})
export class CreateNewEventModule { }
