import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserQuery } from '../../store/user.query';
import { Observable } from 'rxjs';
import { User } from '../../model/user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { TwoFactorAuthResponse } from '../../model/model';
import { ToastrService } from 'ngx-toastr';
import { QRCodeModule } from 'angularx-qrcode';
import { UserState } from '../../store/user.store';
import { UserStateService } from '../../service/user-state/user-state.service';


@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule, CommonModule, QRCodeModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {

  enable2FA: boolean = false; // Default: 2FA is disabled
  is2FAEnabled: boolean = false;  // 2FA status
  username: string = ''
  user$: Observable<User | null>;

  qrCodeUrl: string = '';  // QR code URL to be passed to QrCodeComponent
  isQrCodeGenerated: boolean = false;  // To control visibility of the QR code

  setup2FAurl: string = `${environment.API_BASE_URL}/api/v1/2fa/setup`;
  disable2FAurl: string = `${environment.API_BASE_URL}/api/v1/2fa/disable`;

  http: HttpClient = inject(HttpClient);
  userStateService: UserStateService = inject(UserStateService);

  constructor(private userQuery: UserQuery, private toastr: ToastrService) {
    this.user$ = this.userQuery.getUser$();
  }

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      if (user) {
        // Populate user name from user store
        this.username = user.email;
        this.is2FAEnabled = user.twoFactorAuthEnabled
      }
    });
  }

  toggle2FA() {
    // Logic to handle enabling/disabling 2FA
    this.enable2FA = !this.enable2FA;
  }

  enableTwoFA() {
    this.http.post<TwoFactorAuthResponse>(this.setup2FAurl, this.username).subscribe({
      next: (res: TwoFactorAuthResponse) => {
        this.qrCodeUrl = res.qrCodeUrl;  // Store the QR code URL
        this.isQrCodeGenerated = res.enabled;  // Make the QR code visible
        this.is2FAEnabled = false;  // Show QR code instead of the "Enable 2FA" button
        const partialUser: Partial<User> = {
          twoFactorAuthEnabled: res.enabled,
          qrCodeUrl: res.qrCodeUrl
        };

        //update the store
        this.userStateService.updateUser(partialUser);
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.error.message);
      }
    })

  }

  diable2FA() {
    this.http.post<TwoFactorAuthResponse>(this.disable2FAurl, this.username).subscribe({
      next: (res: TwoFactorAuthResponse) => {
        this.qrCodeUrl = res.qrCodeUrl;  // Store the QR code URL
        this.isQrCodeGenerated = res.enabled;  // Make the QR code visible
        this.is2FAEnabled = false;
        const partialUser: Partial<User> = {
          twoFactorAuthEnabled: res.enabled,
          qrCodeUrl: res.qrCodeUrl
        };

        //update the store
        this.userStateService.updateUser(partialUser);
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.error.message);
      }
    })
  }

}
