import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { loginRequest, loginResponse, signupRequest } from '../model/model';
import { Observable, throwError } from 'rxjs';
import { environment } from '../environment/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  signupUrl = `${environment.API_BASE_URL}/api/auth/signup`;
  loginUrl = `${environment.API_BASE_URL}/api/auth/login`;

  http = inject(HttpClient)

  signUp(signUpData: signupRequest): Observable<any> {
    return this.http.post(this.signupUrl, signUpData).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {

    let errorMessage = 'Something went wrong. Please try again later.';

    if (error.status === 409) {
      errorMessage = 'This email is already registered!';
    } 
    else if(error.status === 401){
      errorMessage = error.error.error || 'Invalid email or password';
    }
    return throwError( () => new Error(errorMessage));
  }

  login(loginReq: loginRequest): Observable<any> {
    return this.http.post(this.loginUrl, loginReq).pipe(
      catchError(this.handleError)
    );
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }
}


