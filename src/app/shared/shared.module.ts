import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudModule } from './component/crud.module';
import { MaterialModule } from './material.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CrudModule,
    MaterialModule
  ],
  exports: [
    CrudModule,
    MaterialModule
  ]
})
export class SharedModule { }
