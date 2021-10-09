import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@NgModule({
  declarations: [LoginComponent, UserRegistrationComponent, EditProfileComponent],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule],
})
export class AuthModule {}
