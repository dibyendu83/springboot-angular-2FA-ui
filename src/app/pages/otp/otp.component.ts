
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../model/user.model';
import { Observable } from 'rxjs';
import { UserQuery } from '../../store/user.query';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { TwoFactorAuthRequest } from '../../model/model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})
export class OtpComponent implements OnInit{

  user$: Observable<User | null>;

  http: HttpClient = inject(HttpClient);

  apiUrl: string = `${environment.API_BASE_URL}/api/v1/2fa/validate`;

  twoFactorAuthReq: TwoFactorAuthRequest = {
    username: '',
    otpCode: ''
  }
  constructor(private userQuery: UserQuery, private router: Router, private toastr: ToastrService) {
    this.user$ = this.userQuery.getUser$();
  }

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      if (user) {
        // Populate user name from user store
        this.twoFactorAuthReq.username = user.email;
      }
    });
  }

  validateOTP() {
    this.http.post(this.apiUrl, this.twoFactorAuthReq).subscribe({
      next: (res: any) => {
        // if the validation is true redirect to home page
        if (res.result == true) {
          this.router.navigate(['/home']);
        }else{
          this.toastr.error("Invalid OTP. Pls try again.");  
        }
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.error.message);  
      }
    })

  }

}
