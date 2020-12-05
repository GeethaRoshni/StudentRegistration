import { NgModule } from '@angular/core';
import { ApplicationComponent } from './application.component';
import { StudentsFormComponent } from './students-form/students-form.component';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmScreenComponent } from './confirm-screen/confirm-screen.component';

const routes: Routes = [
  {
    path: '', component: ApplicationComponent, children: [
      {
        path: '', component: StudentsFormComponent
      },
      {
        path: 'edit', component: StudentsFormComponent
      },
      {
        path: 'confirm', component: ConfirmScreenComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
