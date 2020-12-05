import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const fakeUsers = [{
            email: 'rohit@gmail.com',
            id: 1,
            phonenumber: '9878654533',
            username: 'rohit',
        },
        {
            email: 'shubh@gmail.com',
            id: 2,
            phonenumber: '9878453533',
            username: 'shubham'
        },
        {
            email: 'hima@gmail.com',
            id: 0,
            phonenumber: '9878787878',
            username: 'himanshi'
        }
        ];
        // array in local storage for registered users
        const users: any[] = JSON.parse(localStorage.getItem('users')) || fakeUsers;

        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {
            // authenticate
            if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
                // find if any user matches login credentials
                const filteredUsers = users.filter(user => {
                    return (user.username === request.body.username && user.phonenumber === request.body.phonenumber);
                });

                if (filteredUsers.length) {
                    // if login details are valid return 200 OK with user details and fake jwt token
                    const user = filteredUsers[0];
                    const body = {
                        id: user.id,
                        username: user.username,
                        token: 'fake-jwt-token',
                        email: user.email,
                        phonenumber: user.phonenumber
                    };
                    localStorage.setItem('users', JSON.stringify(users));
                    return of(new HttpResponse({ status: 200, body: body }));
                } else {
                    // else return 400 bad request
                    return throwError({ error: { message: 'Username or phone number is incorrect' } });
                }
            }
          // register user
            if (request.url.endsWith('/users/register') && request.method === 'POST') {
                // get new user object from post body
                const newUser = request.body;
                // validation
                const duplicatePhNUmber = users.filter(user => user.phonenumber === newUser.phonenumber).length;
                if (duplicatePhNUmber) {
                    return throwError({ error: { message: 'Phone Number "' + newUser.phonenumber + '" is already taken' } });
                }
                const duplicateEmail = users.filter(user => user.email === newUser.email).length;
                if (duplicateEmail) {
                    return throwError({ error: { message: 'Email "' + newUser.email + '" is already taken' } });
                }
                // save new user
                newUser.id = users.length + 1;
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));

                // respond 200 OK
                return of(new HttpResponse({ status: 200 }));
            }

            // pass through any requests not handled above
            return next.handle(request);
        }));
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
