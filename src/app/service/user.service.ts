import { inject, Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { signupRequest } from '../model/model';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  updateProfileUrl:string = `${environment.API_BASE_URL}/api/v1/user/profile`;

  http:HttpClient = inject(HttpClient);

  constructor() { }

  updateProfileData(request: signupRequest):Observable<any> {
    console.log('update profile data = ', request);
    return this.http.post(this.updateProfileUrl, request);
  }

  
}
