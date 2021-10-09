import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss'],
})
export class UserRegistrationComponent implements OnInit {
  public userRegistrationForm: FormGroup = this.formBuilder.group({});
  public isSubmitted = false;
  public successToast = false;
  public errorToast = false;

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm() {
    this.userRegistrationForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
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
    });
  }
  createUser() {
    this.isSubmitted = true;
    if (!this.userRegistrationForm.valid) {
      return;
    }
    const appUsers = localStorage.getItem('users');
    if (appUsers && appUsers.length) {
      if (this.validateUserExistence(appUsers)) {
        this.errorToast = true;
        return;
      }
    }
    this.errorToast = false;
    const updatedUsers =
      appUsers && appUsers.length
        ? this.getUsersArray(appUsers)
        : JSON.stringify([this.userRegistrationForm.value]);
    this.successToast = true;
    setTimeout(() => {
      this.successToast = false;
    }, 5000);
    localStorage.setItem('users', updatedUsers);
    this.isSubmitted = false;
    this.clearForm();
  }
  clearForm() {
    this.userRegistrationForm.setValue({
      email: '',
      displayName: '',
      password: '',
    });
  }
  getUsersArray(currentUsers: string) {
    const updatedUsers = JSON.parse(currentUsers);
    updatedUsers.push(this.userRegistrationForm.value);
    return JSON.stringify(updatedUsers);
  }
  validateUserExistence(currentUsers: any) {
    return JSON.parse(currentUsers).some(
      (user: any) => user.email === this.userRegistrationForm.value.email
    );
  }
}
