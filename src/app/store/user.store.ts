import { Injectable } from '@angular/core';
import { EntityStore, StoreConfig } from '@datorama/akita';
import { User } from '../model/user.model';


export interface UserState {
  user: User | null;
}

export function createInitialState(): UserState {
  return {
    user: null
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'user' })
export class UserStore extends EntityStore<UserState> {
  constructor() {
    super(createInitialState());
  }

  // Method to update the user state
  setUser(user: User) {
    this.update({ user });
  }

  // Method to update only specific fields of the user profile
  updateUser(partialUser: Partial<User>) {
    this.update((state: { user: any}) => ({
      user: { ...state.user, ...partialUser } // Merge current state with the new values
    }));
  }
}
