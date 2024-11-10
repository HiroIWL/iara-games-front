import { NgModule } from '@angular/core';
import { LoginFormComponent } from './login-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [ReactiveFormsModule, CommonModule],
  exports: [LoginFormComponent],
  declarations: [LoginFormComponent],
})
export class LoginFormModule {}
