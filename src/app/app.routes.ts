import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { authGuard } from './auth/auth.guard';
import { SettingsComponent } from './pages/settings/settings.component';
import { OtpComponent } from './pages/otp/otp.component';




export const routes: Routes = [

    { path: 'login', component: LoginComponent }, // Login page
    {
        path: '',
        component: LayoutComponent, // Layout with navbar
        canActivate: [authGuard], // Protect the routes
        children: [
          { path: 'home', component: HomeComponent },
          { path: 'profile', component: ProfileComponent },
          { path: 'settings', component: SettingsComponent},
          { path: '', redirectTo: 'home', pathMatch: 'full' } // Default to home
        ]
    },
    {path: 'f2a', component: OtpComponent},
    { path: '**', redirectTo: 'login' } // Redirect unknown paths to login
    
];
