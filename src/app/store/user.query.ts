import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import {  UserState, UserStore } from './user.store';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';


@Injectable({ providedIn: 'root' })
export class UserQuery extends Query<UserState> {
  constructor(store: UserStore) {
    super(store);
  }

  // Selector to get the current user
  getUser$(): Observable<User | null> {
    return this.select(state => state.user);
  }
}
