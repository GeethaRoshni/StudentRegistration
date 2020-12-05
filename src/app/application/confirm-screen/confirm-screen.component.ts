import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApplicationFormService } from '../services/application-form.service';

@Component({
  selector: 'app-confirm-screen',
  templateUrl: './confirm-screen.component.html',
  styleUrls: ['./confirm-screen.component.scss']
})
export class ConfirmScreenComponent implements OnInit, OnDestroy {
  detailsSubscription: Subscription;
  formDetails;
  dobValue;
  completionValue;
  constructor(private _applicationFormService: ApplicationFormService, private _router: Router, private _datepipe: DatePipe) { }

  ngOnInit(): void {
    this.detailsSubscription = this._applicationFormService.getFormData().subscribe(formData => {
      if (formData) {
        this.formDetails = formData.data;
        this.dobValue = this._datepipe.transform(this.formDetails.dob, 'medium')
        this.completionValue = this._datepipe.transform(this.formDetails.completion, 'medium')
        console.log(this.formDetails);
      }
    });
  }

  edit() {
    this._applicationFormService.sendEditInfo(true);
    this._router.navigateByUrl('/application-form');
  }

  continue() {

  }
  ngOnDestroy() {
    if (this.detailsSubscription) { this.detailsSubscription.unsubscribe(); }
  }

}
