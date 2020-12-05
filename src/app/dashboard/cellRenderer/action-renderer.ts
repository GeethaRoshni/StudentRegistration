import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';


@Component({
  selector: 'action-cell',
  template: `<button class="btn btn-primary" (click)="onButtonClick(params)">Apply</button>`,
})
export class ActionRenderer implements ICellRendererAngularComp {
  params: any;

  // called on init
  agInit(params: any): void {
    this.params = params;
  }

  // called when the cell is refreshed
  refresh(params: any): boolean {
    this.params = params;
    return true;
  }

  onButtonClick(params:any){
      this.params.context.componentParent.apply(params.data);
  }
}