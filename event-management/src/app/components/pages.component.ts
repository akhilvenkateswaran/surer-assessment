import { Component } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'ngx-pages',
  template: `
    <nb-layout>
      <nb-layout-header fixed>
        <ngx-header></ngx-header>
      </nb-layout-header>

      <nb-sidebar class="menu-sidebar" tag="menu-sidebar" responsive>
        <nb-menu [items]="menu"></nb-menu>
      </nb-sidebar>

      <nb-layout-column>
        <router-outlet></router-outlet>
      </nb-layout-column>
    </nb-layout>
  
  `,
})
export class PagesComponent {

   menu: NbMenuItem[] = [
  
    {
      title: 'Events',
      icon: 'layout-outline',
      children: [
        {
          title: 'List Events',
          icon: 'funnel-outline',
          link: '/pages/list-events',
          home: true,
        },
        {
          title: 'Create New Event',
          icon: 'plus-square-outline',
          link: '/pages/create-new-event',
        }],
    },
  ];
}
