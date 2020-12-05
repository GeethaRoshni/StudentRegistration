import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({ providedIn: 'root' })
export class DashboardService {
    private clgDetails$ = new BehaviorSubject(null);
    constructor(private http: HttpClient) { }
    sendClgData(data: any) {
        this.clgDetails$.next({ data });
    }

    getClgData(): Observable<any> {
        return this.clgDetails$.asObservable();
    }

}
