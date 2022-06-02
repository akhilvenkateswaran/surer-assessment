import { Component, ElementRef, TemplateRef, ViewChild } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { OAuthService } from "angular-oauth2-oidc";
import { environment } from "src/environments/environment";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NbWindowControlButtonsConfig, NbWindowService } from "@nebular/theme";
import * as strings from '../../../assets/json/strings.json';

@Component({
    styleUrls: ['./list-events.component.scss'],
    templateUrl: './list-events.component.html',
  })
export class ListEventsComponent {

    source: LocalDataSource = new LocalDataSource();
    stringsList = strings;
    searchForm: FormGroup;
    isSubmit: boolean = false
    @ViewChild('search') searchInput: ElementRef;
    @ViewChild('contentTemplate', { static: true }) contentTemplate: TemplateRef<any>;
    details = {name: '', date: '',description: ''}
    events:{}[] = []
    checked: boolean = false
    settings = {
        actions: false,
        columns: {
        
          name: {
            title: 'Name',
            type: 'string',
            width: '33%',
            filter: false
          },
          date: {
            title: 'Date',
            type: 'string',
            width: '33%',
            filter: false
          },
          description: {
            title: 'Description',
            type: 'string',
            width: '33%',
            filter: false
          },
        },
      };
      constructor(
        private httpClient: HttpClient,
        private oAuthService: OAuthService,
        private fb: FormBuilder,
        private nbWindowService: NbWindowService) {
      }

    ngOnInit() {
      this.searchForm = this.fb.group({
        "search": ['',Validators.required]
      })
    }

    toggle(event:any) {
      this.checked = event.target.checked
    }

    onSearch(query: string = '') {
     
      this.isSubmit = true
      var headers = new HttpHeaders();
      var url = environment.apiURL + '/api/app/events?FilterText=' + query 
      if(this.checked){
        var maxDate = new Date();
        maxDate.setMonth(maxDate.getMonth() + 3)
        url += '&DateFromMin=' + new Date().toISOString().split("T")[0] + '&DateToMax=' + maxDate.toISOString().split("T")[0]
      }
      headers.set('Accept', 'text/json');

      if(!this.searchForm.invalid) {
        this.httpClient.get(url,{headers}).subscribe((data)=> {
          data['items'].forEach(result => {
            this.details.name = result.name
            this.details.date = result.dateFrom.split("T")[0] + ' to ' + result.dateTo.split("T")[0]
            this.details.date += String.fromCharCode(10) + result.time
            this.details.description = result.description + String.fromCharCode(10) + String.fromCharCode(10)

            if(result.subEvents.length > 0) {
              result.subEvents.forEach(element=>{
                  this.details.description += element.name 
                  + String.fromCharCode(10) 
                  + element.description 
                  + String.fromCharCode(10)
                  + element.dateFrom.split("T")[0] + ' to ' + element.dateTo.split("T")[0]
                  + String.fromCharCode(10)
                  + element.time
              })
            }
            this.events.push(this.details)
            this.source.load(this.events)
            this.details = {name: '', date: '',description: ''}

          });
          this.events = []
    },
    
    (error)=>{
        this.showErrorDialog('Error','Error in displaying events. Please try again')
    })
      }
      
      }
      
    showErrorDialog(title,message) {
      const buttonsConfig: NbWindowControlButtonsConfig = {
        minimize: false,
        maximize: false,
        fullScreen:false,
        close: true,
      };
      this.nbWindowService.open(
        this.contentTemplate,
        {
          title: title,
          context: {
            text: message,
          },
          buttons: buttonsConfig
        },
      ); 
    }
}
