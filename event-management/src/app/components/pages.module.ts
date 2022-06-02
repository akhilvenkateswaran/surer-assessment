import {NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { ListEventsModule } from './list-events/list-events.module';
import { CreateNewEventModule } from './create-new-event/create-new-event.module';
import { PagesRoutingModule } from './pages-routing.module';
import { HeaderComponent } from '../components/header/header.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { CommonModule } from '@angular/common';

import {
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbActionsModule,
  NbLayoutModule,
  NbButtonModule,
  NbIconModule,
  NbThemeModule
} from '@nebular/theme';
@NgModule({
  imports: [
    PagesRoutingModule,
    NbMenuModule,
    ListEventsModule,
    CreateNewEventModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDialogModule.forRoot(),
    NbActionsModule,
    NbLayoutModule,
    NbButtonModule,
    NbIconModule,
    NbThemeModule,
    NbEvaIconsModule,
    CommonModule
  ],
  providers: [
    ...NbThemeModule.forRoot(
      {
        name: 'dark',
      }
    ).providers,
  ],
  declarations: [
    PagesComponent,
    HeaderComponent
  ],
})
export class PagesModule {
  
}
