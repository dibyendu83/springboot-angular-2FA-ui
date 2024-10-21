import { Component } from '@angular/core';
import { Router, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { UserStateService } from '../../service/user-state/user-state.service';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLinkActive, RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  user:User = {
    "id": 0,
    "name": '',
    "firstname": '',
    "lastname": '',
    "email": '',
    "phoneNo": '',
    "address": '',
    "sex": '',
    "lastLogIn": '',
    "dob": '',
    "twoFactorAuthEnabled": false,
    "qrCodeUrl": ''
  }

  constructor(private authService: AuthService, private router: Router, private userstateservice: UserStateService) {

  }

  isLoginRoute(): boolean {
    return this.router.url === '/login';
  }

  isAuthenticated(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(){
    console.log("logging out");
    this.authService.logout();
    this.userstateservice.setUser(this.user);
    this.router.navigate(['/login']);
  }

}
