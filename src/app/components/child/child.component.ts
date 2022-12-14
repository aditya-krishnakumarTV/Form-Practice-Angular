import * as moment from 'moment';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, ValidationErrors, AbstractControl } from '@angular/forms';

import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  myForm: any

  constructor(
    private fb: FormBuilder,
    private formService: FormService) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      'name': ['', Validators.required],
      'email': ['', [Validators.required, Validators.email]],
      'number': ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$')]],
      'date': ['', [Validators.required, this.dateValidator]]
    })
    this.checkValidation()
  }

  dateValidator(control: AbstractControl): ValidationErrors | null {
    const contValue = control.value
    if (!moment(contValue, "DD/MM/YYYY", true).isValid()) {
      return { 'dateFormatInvalid': true }
    }
    return null;
  }

  get nameField(): FormControl {
    return this.myForm.get('name') as FormControl
  }
  get emailField(): FormControl {
    return this.myForm.get('email') as FormControl
  }
  get numberField(): FormControl {
    return this.myForm.get('number') as FormControl
  }
  get dateField(): FormControl {
    return this.myForm.get('date') as FormControl
  }

  checkValidation() {
    this.formService.checkValidation.subscribe(val => {
      if (val) {
        if (this.myForm.invalid) {
          this.nameField.markAsTouched();
          this.emailField.markAsTouched();
          this.numberField.markAsTouched();
          this.dateField.markAsTouched();
        } else if (this.myForm.valid) {
          this.formService.formStatus(this.myForm.status)
          this.formService.pushFormValues(this.myForm.value)
        }
      }
    })
  }

  log(value: string) {
    console.log(this.myForm.get(value))
  }

}
