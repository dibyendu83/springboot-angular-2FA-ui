import { Injectable } from '@angular/core';
import { User } from '../../model/user.model';
import { UserStore } from '../../store/user.store';


@Injectable({
  providedIn: 'root'
})
export class UserStateService {

  constructor(private userStore: UserStore) {}

  // After successful login, set user data
  setUser(userData: User) {
    this.userStore.setUser(userData);
  }

  // Method to update user profile fields (e.g., name and phone no , address etc)
  updateUser(updatedFields: Partial<User>) {
    this.userStore.updateUser(updatedFields);
  }

}
