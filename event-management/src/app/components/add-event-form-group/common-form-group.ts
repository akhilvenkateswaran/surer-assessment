import { FormControl, FormGroup } from '@angular/forms'

export class CommonFormGroup{
    public detailsList=new FormGroup({
        name: new FormControl(""),
        startDate: new FormControl(""),
        endDate: new FormControl(""),
        description: new FormControl(""),
        time : new FormControl("")
    })
}