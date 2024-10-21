import { Component, NgModule } from '@angular/core';
import { loginRequest, loginResponse, signupRequest } from '../../model/model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { User } from '../../model/user.model';
import { UserStateService } from '../../service/user-state/user-state.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  signupForm: FormGroup;
  loginForm: FormGroup;

  signupReq: signupRequest = {
    "firstname": '',
    "lastname": '',
    "email": '',
    "password": '',
    "phoneNo": '',
    "address": '',
    "sex": '',
    "dob": ''
  }

  loginReq: loginRequest = {
    "email": '',
    "password": ''
  }

  isLoginPage: boolean = true;

  constructor(private authService: AuthService, private toastr: ToastrService,
    private router: Router, private userstate: UserStateService, private fb: FormBuilder) {

    this.signupForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phoneNo: ['', Validators.required],
      sex: ['', Validators.required],
      address: ['', Validators.required],
      dob: ['', Validators.required]
    });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }


  // Helper function to check form control validation status
  isInvalid(controlName: string) {
    const control = this.signupForm.get(controlName);
    return control?.invalid && (control.dirty || control.touched);
  }

  // Helper function to check form control validation status
  isLoginInvalid(controlName: string) {
    const control = this.loginForm.get(controlName);
    return control?.invalid && (control.dirty || control.touched);
  }



  singup(event: MouseEvent): void {
    event.preventDefault();
    this.isLoginPage = false;
  }

  singin(event: MouseEvent): void {
    event.preventDefault();
    this.isLoginPage = true;
  }



  registerUser(): void {
    // validate the form first
    if (this.signupForm.invalid) {
      return;
    }

    this.signupReq = this.signupForm.value;
    console.log("user = ", this.signupReq)
    this.authService.signUp(this.signupReq).subscribe({
      next: (value: any) => {
        console.log("success !!! ", value)
        this.toastr.success('Sign up successful!');
        this.isLoginPage = true;
      },
      error: (error: Error) => {
        if (error.message === 'This email is already registered!') {
          this.toastr.error('This email is already registered. Please use another email.');
        } else {
          this.toastr.error('An error occurred. Please try again.');
        }
      }
    });
  }


  signinUser(): void {

    // validate the form first
    if (this.loginForm.invalid) {
      return;
    }

    this.loginReq = this.loginForm.value;
    console.log("login request = ", this.loginForm);

    this.authService.login(this.loginReq).subscribe({
      next: (response: loginResponse) => {
        console.log('Login successful!', response);
        // save the access token into localstorage
        localStorage.setItem("access_token", response.accessToken);
        //save the user into store
        this.userstate.setUser(this.getLoggedInUser(response));

        if (response.twoFactorAuthEnabled) {
          // Redirect to OTP page 
          this.router.navigate(['/f2a']);
        } else {
          // Redirect to home 
          this.router.navigate(['/home']);
        }

      },
      error: (error: Error) => {
        this.toastr.error(error.message);
      },
    });
  }

  getLoggedInUser(response: any): User {
    let user: User = {
      "id": response.id,
      "name": response.name,
      "firstname": response.firstname,
      "lastname": response.lastname,
      "email": response.email,
      "phoneNo": response.phoneNo,
      "address": response.address,
      "sex": response.sex,
      "lastLogIn": response.lastLogIn,
      "dob": response.dob,
      "twoFactorAuthEnabled": response.twoFactorAuthEnabled,
      "qrCodeUrl": response.qrCodeUrl
    };

    return user;
  }

}
