import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crud-content',
  template: '<ng-content></ng-content>'
})
export class CrudContentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
