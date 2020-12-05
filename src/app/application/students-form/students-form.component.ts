import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DashboardService } from 'src/app/service/dashboard.service';
import { ApplicationFormService } from '../services/application-form.service';

@Component({
  selector: 'app-students-form',
  templateUrl: './students-form.component.html',
  styleUrls: ['./students-form.component.scss']
})
export class StudentsFormComponent implements OnInit, OnDestroy {
  applicationForm: FormGroup;
  genderList = [{ key: 'male', name: 'Male' }, { key: 'female', name: 'Female' }, { key: 'others', name: 'Others' }]
  isEdit = false;
  updatedDataSubscription: Subscription;
  editubscription: Subscription;
  dashboardDataSubscription: Subscription;
  clgInfo: string;
  isApply = false;
  constructor(
    private _fb: FormBuilder,
    private _applicationFormService: ApplicationFormService,
    private _router: Router,
    private _dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.applicationForm = this._fb.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(50), Validators.minLength(2)])],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.compose([Validators.required,
      Validators.maxLength(100), Validators.minLength(8), Validators.pattern('^[a-zA-Z0-9-_,& ]*$')])],
      city: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      state: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      country: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      schoolName: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      completion: ['', Validators.required],
      percentage: ['', Validators.compose([Validators.required, Validators.pattern('^[1-9][0-9]*$')])]
    });

    this.dashboardDataSubscription = this._dashboardService.getClgData().subscribe(clgData => {
      if (clgData) {
        this.clgInfo = clgData.data
        console.log(this.clgInfo);
      }
    })

    this.editubscription = this._applicationFormService.getEditInfo().subscribe(val => {
      if (val) {
        this.isEdit = true
      }
    })

    /** Set Udated data */
    if (this.isEdit) {
      this.updatedDataSubscription = this._applicationFormService.getFormData().subscribe(formData => {
        if (formData.data) {
          this.isApply = true;
          const data = formData.data;
          this.applicationForm.setValue({
            name: data.name,
            dob: data.dob,
            gender: data.gender,
            address: data.address,
            city: data.city,
            state: data.state,
            country: data.country,
            schoolName: data.schoolName,
            completion: data.completion,
            percentage: data.percentage
          })
        }
      })
    }
  }

  /** Getting form control */
  get formCtrl() {
    return this.applicationForm.controls;
  }

  /** Navigate to dashboard page */
  cancel() {
    this._router.navigateByUrl('dashboard')
  }

  /** Show the form if apply */
  applyForm() {
    this.isApply = true;
  }

  /** Goto confirmation screen */
  apply() {
    if (this.applicationForm.invalid) {
      // Cant able to give markAllAsTouched because of version mismatch in angular. Otherwise it will show invalid form field errors
      this.applicationForm.markAsTouched();
      return
    } else {
      this._applicationFormService.sendFormData(this.applicationForm.value);
      this._router.navigateByUrl('/application-form/confirm');
    }
  }

  ngOnDestroy() {
    if (this.dashboardDataSubscription) { this.dashboardDataSubscription.unsubscribe(); }
    if (this.updatedDataSubscription) { this.updatedDataSubscription.unsubscribe(); }
    if (this.editubscription) { this.editubscription.unsubscribe(); }
  }
}
