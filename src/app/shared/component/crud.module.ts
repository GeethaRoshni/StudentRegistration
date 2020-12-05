import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudComponent } from './crud.component';
import { CrudActionsComponent } from './crud-actions/crud-actions.component';
import { CrudContentComponent } from './crud-content/crud-content.component';
import { CrudHeaderComponent } from './crud-header/crud-header.component';
import { CrudTitleComponent } from './crud-title/crud-title.component';



@NgModule({
  declarations: [
    CrudComponent,
    CrudActionsComponent,
    CrudContentComponent,
    CrudHeaderComponent,
    CrudTitleComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CrudComponent,
    CrudActionsComponent,
    CrudContentComponent,
    CrudHeaderComponent,
    CrudTitleComponent
  ]
})
export class CrudModule { }
