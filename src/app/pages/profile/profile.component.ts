import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../model/user.model';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { loginResponse, signupRequest, updateProfileRequest } from '../../model/model';
import { UserQuery } from '../../store/user.query';
import { UserService } from '../../service/user.service';
import { ToastrService } from 'ngx-toastr';
import { UserStateService } from '../../service/user-state/user-state.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [AsyncPipe, CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  isEdit:boolean = false;

  profile: updateProfileRequest = {
    firstname: '',
    lastname: '',
    email: '',
    phoneNo: '',
    sex: '',
    address: '',
    dob: ''
  };

  

  user$: Observable<User | null>;

  constructor(private userQuery: UserQuery, private userService: UserService, 
    private toastr: ToastrService, private userstate : UserStateService) {
    this.user$ = this.userQuery.getUser$();
  }
  ngOnInit(): void {
  
  }

  

  editProfile() {
    this.isEdit = true;
    this.user$.subscribe((user) => {
      
      if (user) {
        // Populate profile with user data
        this.profile.firstname = user.firstname;
        this.profile.lastname = user.lastname;
        this.profile.email = user.email;
        this.profile.phoneNo = user.phoneNo;
        this.profile.sex = user.sex;
        this.profile.address = user.address;
        this.profile.dob = user.dob;
      }
    });
  }

  updateProfile() {

    let request: signupRequest = {
      firstname: this.profile.firstname,
      lastname: this.profile.lastname,
      email: this.profile.email,
      phoneNo: this.profile.phoneNo,
      sex: this.profile.sex,
      address: this.profile.address,
      password: '',
      dob: this.profile.dob
    }
    this.userService.updateProfileData(request).subscribe({
      next: (res: loginResponse) => {
        const partialUser: Partial<User> = {
          name: res.name,
          firstname: res.firstname,
          lastname: res.lastname,
          sex: res.sex,
          phoneNo: res.phoneNo,
          address: res.address,
          dob: res.dob
        };

        //update the store
        this.userstate.updateUser(partialUser);
        this.toastr.success("User profile udate successful")
        this.isEdit = false;

      },
      error: (error: HttpErrorResponse)=>{
        console.log("error while updating profile " , error);
        this.toastr.error(error.error.message);        
      }
    })
  }

  cancelEdit() {

  }

}
