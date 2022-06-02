
import { NgModule } from '@angular/core';
import { ListEventsComponent } from './list-events.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbInputModule,NbButtonModule,NbCardModule,NbCheckboxModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    Ng2SmartTableModule,
    NbInputModule,
    NbButtonModule,
    NbCardModule,
    CommonModule,
    NbCheckboxModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ListEventsComponent
  ],
})
export class ListEventsModule { }
