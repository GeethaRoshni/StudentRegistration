import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
    public updateUserData;
    public addNewUser = false;
    constructor(private http: HttpClient) { }
    register(user: User) {
        return this.http.post(`/users/register`, user);
    }
}
