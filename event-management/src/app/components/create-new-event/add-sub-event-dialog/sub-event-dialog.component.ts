import { Component, Input } from '@angular/core';
import { Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { CommonFormGroup } from '../../add-event-form-group/common-form-group';
import * as strings from '../../../../assets/json/strings.json';

@Component({
  selector: 'ngx-showcase-dialog',
  templateUrl: 'sub-event-dialog.component.html',
  styleUrls: ['sub-event-dialog.component.scss'],
})
export class SubEventDialogComponent extends CommonFormGroup{

  @Input() title: string;
  stringsList = strings;

  
  isSubmit: boolean = false;
  minDate: any = new Date().toISOString().split('T')[0]
  constructor(protected ref: NbDialogRef<SubEventDialogComponent>) {
    super()
  }

  ngOnInit(){
    this.detailsList.get('name').setValidators([Validators.required,Validators.minLength(5),Validators.maxLength(256)])
    this.detailsList.get('startDate').setValidators(Validators.required)
    this.detailsList.get('endDate').setValidators(Validators.required)
    this.detailsList.get('description').setValidators([Validators.required,Validators.minLength(5)])
  }

  dismiss() {
    this.isSubmit = true
    if(!this.detailsList.invalid) {
      this.ref.close({
        name: this.detailsList.get('name').value,
        description: this.detailsList.get('description').value,
        dateFrom: this.detailsList.get('startDate').value,
        dateTo: this.detailsList.get('endDate').value,
        time: this.detailsList.get('time').value,
        eventType:1
    });
    }
    
  }
}
