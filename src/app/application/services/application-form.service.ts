import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationFormService {
  private formDetails$ = new BehaviorSubject(null);
  private editDetails$ = new BehaviorSubject(null);

  constructor() { }


  sendFormData(data: any) {
    this.formDetails$.next({ data });
  }

  getFormData(): Observable<any> {
    return this.formDetails$.asObservable();
  }

  sendEditInfo(data: any) {
    this.editDetails$.next({ data });
  }

  getEditInfo(): Observable<any> {
    return this.editDetails$.asObservable();
  }
}
