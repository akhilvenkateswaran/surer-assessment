import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { ListEventsComponent } from './list-events/list-events.component';
import { CreateNewEventComponent } from './create-new-event/create-new-event.component';
const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'list-events',
      component: ListEventsComponent,
    },
    {
      path: 'create-new-event',
      component: CreateNewEventComponent,
    },
    {
      path: '',
      redirectTo: 'list-events',
      pathMatch: 'full',
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
