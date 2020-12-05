import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudActionsComponent } from './crud-actions.component';

describe('CrudActionsComponent', () => {
  let component: CrudActionsComponent;
  let fixture: ComponentFixture<CrudActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
