import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup = this.formBuilder.group({});
  public errorToast = false;
  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  loginUser() {
    const users = localStorage.getItem('users');
    if (users && users.length) {
      const loginUser = JSON.parse(users).find(
        (user: any) =>
          user.email === this.loginForm.value.email &&
          user.password === this.loginForm.value.password
      );
      if (loginUser) {
        this.router.navigate(['home']);
        localStorage.setItem('activeUser', JSON.stringify(loginUser));
        return;
      }
    }
    this.errorToast = true;
  }
}
