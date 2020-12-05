import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsFormComponent } from './students-form/students-form.component';
import { ApplicationComponent } from './application.component';
import { ApplicationRoutingModule } from './application-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmScreenComponent } from './confirm-screen/confirm-screen.component';



@NgModule({
  declarations: [StudentsFormComponent, ApplicationComponent, ConfirmScreenComponent],
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ApplicationModule { }
