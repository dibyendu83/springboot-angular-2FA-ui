import { Component } from '@angular/core';
import { RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { User } from '../../model/user.model';
import { UserQuery } from '../../store/user.query';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLinkActive, RouterModule, CommonModule, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  user$: Observable<User | null>;

  constructor(private userQuery: UserQuery) {
    this.user$ = this.userQuery.getUser$();
  }
  
}
