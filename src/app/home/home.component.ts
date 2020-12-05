import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../model/user.model';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy {

  currentUser: User;
    currentUserSubscription: Subscription;
    users: User[] = [];

    constructor(
        private authenticationService: AuthenticationService
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }
debugger;
    private map = new Map<string, string[]>([
      ['Noida', ['Noida Institute of Engineering and Technology', 'Indian Institute of Finance']],
      ['Pune', ['MIT Institute of Design', 'International School of Business and Media']],
    ]);

    college: string;
    city: string;

    get cities(): string[] {
      return Array.from(this.map.keys());
    }
    get colleges(): string[] | undefined {
      return this.map.get(this.city);
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }
    }
