import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  public profileForm: FormGroup = this.formBuilder.group({});
  public currentUser = localStorage.getItem('activeUser');
  public successToast = false;
  public isSubmitted = false;
  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm() {
    this.profileForm = this.formBuilder.group({
      password: [
        '',
        [
          Validators.maxLength(20),
          Validators.required,
          ValidationService.sybmbolValidator,
        ],
      ],
      displayName: [
        '',
        [ValidationService.sybmbolValidator, Validators.required],
      ],
      email: [{ value: '', disabled: true }],
    });
    if (this.currentUser) {
      const user = JSON.parse(this.currentUser);
      this.profileForm.patchValue({
        password: user.password,
        displayName: user.displayName,
        email: user.email,
      });
    }
  }
  updateUser() {
    this.isSubmitted = true;
    if (!this.profileForm.valid) {
      return;
    }
    const userArray = localStorage.getItem('users');
    if (userArray && userArray.length && this.currentUser) {
      const activeUser = JSON.parse(this.currentUser);
      const usersCopy = JSON.parse(userArray);
      usersCopy.forEach((user: any) => {
        if (user.email === activeUser.email) {
          user.displayName = this.profileForm.value.displayName;
          user.password = this.profileForm.value.password;
          user.email = activeUser.email;
        }
      });
      localStorage.setItem('users', JSON.stringify(usersCopy));
      localStorage.setItem(
        'activeUser',
        JSON.stringify({
          ...this.profileForm.value,
          ...{ email: activeUser.email },
        })
      );
      this.successToast = true;
    }
  }
  deletAccount() {
    const userArray = localStorage.getItem('users');
    if (userArray && userArray.length && this.currentUser) {
      const activeUser = JSON.parse(this.currentUser);
      let usersCopy = JSON.parse(userArray);
      usersCopy = usersCopy.filter(
        (user: any) => user.email !== activeUser.email
      );
      localStorage.setItem('users', JSON.stringify(usersCopy));
      localStorage.setItem('activeUser', '');
      this.router.navigate(['/auth/login']);
    }
  }
}
