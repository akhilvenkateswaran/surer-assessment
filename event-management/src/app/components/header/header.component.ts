import { Component} from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import * as strings from '../../../assets/json/strings.json';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent  {

  stringsList = strings;
  constructor(private sideBarService: NbSidebarService){

  }

  toggleSidebar(): boolean {
    this.sideBarService.toggle(true, 'menu-sidebar');
    return false;
  }
}
