import { Component, TemplateRef, ViewChild } from "@angular/core";
import { SubEventDialogComponent } from "./add-sub-event-dialog/sub-event-dialog.component";
import { NbDialogService, NbWindowControlButtonsConfig } from '@nebular/theme';
import { LocalDataSource } from "ng2-smart-table";
import { Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { CommonFormGroup } from "../add-event-form-group/common-form-group";
import { NbWindowService } from "@nebular/theme";
import { environment } from "src/environments/environment";
import * as strings from '../../../assets/json/strings.json';


@Component({
    selector: 'ngx-create-event',
    styleUrls: ['./create-new-event.component.scss'],
    templateUrl: './create-new-event.component.html',
  })
export class CreateNewEventComponent extends CommonFormGroup {

    source: LocalDataSource = new LocalDataSource();
    stringsList = strings;
    createSuccess: boolean = false;
    @ViewChild('contentTemplate', { static: true }) contentTemplate: TemplateRef<any>;
    isSubmit: boolean = false;
    minDate: any = new Date().toISOString().split('T')[0]
    subEventsAdded = []
    
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

    subEvents: {}[] = []
    details:{ name: string, date: string, description: string } = {name: '', date: '',description: ''}
    constructor(
      private dialogService: NbDialogService,
      private httpClient: HttpClient,
      private nbWindowService: NbWindowService) {
        super()
      }

    ngOnInit() {
      console.log(this.stringsList)
      this.detailsList.get('name').setValidators([Validators.required,Validators.minLength(5),Validators.maxLength(256)])
      this.detailsList.get('startDate').setValidators(Validators.required)
      this.detailsList.get('endDate').setValidators(Validators.required)
      this.detailsList.get('description').setValidators([Validators.required,Validators.minLength(5)])
    }


    addSubEvent() {
        this.dialogService.open(SubEventDialogComponent, {
            context: {
              title: 'This is a title passed to the dialog component',
            },
          }).onClose.subscribe(result => {
            if(result){
              this.subEventsAdded.push(result)
              this.details.name = result.name
              this.details.date = result.dateFrom + ' to ' + result.dateTo
              this.details.date += String.fromCharCode(10) + result.time
              this.details.description = result.description
              this.subEvents.push(this.details)
              this.source.load(this.subEvents)
              this.details = {name: '', date: '',description: ''}
            }
            
          });

    }

    submitEventDetails(){
        this.isSubmit = true
        var url = environment.apiURL + '/api/app/events'
        var postData = {
          name: this.detailsList.get('name').value,
          description: this.detailsList.get('description').value,
          dateFrom: this.detailsList.get('startDate').value,
          dateTo: this.detailsList.get('endDate').value,
          time: this.detailsList.get('time').value,
          subEvents: this.subEventsAdded,
          eventType: 0
        }
        if(!this.detailsList.invalid) {
            this.httpClient.post(url,postData).subscribe(
              (success)=>{
                  this.showStatusDialog('Success','Event has been created successfully')
              },
              (error)=>{
                this.showStatusDialog('Error','Error in creating an event. Please try again.')
              })
        }
   }
    
    showStatusDialog(title,message) {
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


