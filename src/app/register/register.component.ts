import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../service/authentication.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  emailRegEx = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private authenticationService: AuthenticationService,
      private userService: UserService,
      private toastr: ToastrManager
  ) {
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue && this.userService.addNewUser === false) {
          this.router.navigate(['/']);
      }
  }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          username: ['', Validators.required],
          email: ['', [Validators.required, Validators.pattern(this.emailRegEx)]],
          phonenumber: ['', [Validators.required, Validators.pattern('[789][0-9]{9}')]]
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  getToday(): string {
   const date = new Date();
   const today = new Date((date.getFullYear() - 18), date.getMonth(), date.getDate());
   return today.toISOString().split('T')[0];
 }
  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }

      this.userService.register(this.registerForm.value)
      .pipe(first())
         .subscribe(
              data => {
                  this.toastr.successToastr('Registration is successful', 'Success!');
                  this.router.navigate(['/login']);
              },
              error => {
                this.toastr.errorToastr(error, 'Oops!');
              });
  }
}
