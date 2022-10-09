import { Component, OnInit } from '@angular/core';

import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  saveStatus: boolean = true

  constructor(private formService: FormService) { }

  ngOnInit(): void {
  }

  showStatus() {
    this.formService.checkValidation.next(true)
    let stat = ''
    stat = this.formService.getValidation()
    if (stat == "VALID") {
      this.saveStatus = false
    } else {
      this.saveStatus = true
    }
  }

  showCount() {
    console.log(this.formService.getCount())
  }

}
