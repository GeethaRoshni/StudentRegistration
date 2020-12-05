import { Component, ContentChild, OnInit } from '@angular/core';
import { CrudTitleComponent } from '../crud-title/crud-title.component';

@Component({
  selector: 'app-crud-header',
  templateUrl: './crud-header.component.html',
  styleUrls: ['./crud-header.component.scss']
})
export class CrudHeaderComponent implements OnInit {
  @ContentChild(CrudTitleComponent) title: CrudTitleComponent;
  constructor() { }

  ngOnInit(): void {
  }

}
