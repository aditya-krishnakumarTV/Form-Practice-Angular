import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  formArr: Array<any> = []

  status: string = ''

  checkValidation = new Subject<any>()

  constructor() { }

  pushFormValues(formValues: any) {
    if (!this.formArr.includes(formValues)) {
      this.formArr.push(formValues)
    }
  }

  formStatus(valStatus: string) {
    this.status = valStatus
  }

  getValidation() {
    return this.status
  }

  getCount() {
    console.log(this.formArr)
    return this.formArr.length
  }

}