import { Component, OnInit } from '@angular/core';
import { Router, RouterLinkActive, RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { User } from './model/user.model';
import { Observable } from 'rxjs';
import { UserQuery } from './store/user.query';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLinkActive, RouterLinkWithHref],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-ui';
  
}
