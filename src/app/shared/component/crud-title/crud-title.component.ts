import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crud-title',
  template: `
  <span class="crud-title">
      <ng-content>
      </ng-content>
  </span>
`,
styleUrls: ['./crud-title.component.scss']
})
export class CrudTitleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
