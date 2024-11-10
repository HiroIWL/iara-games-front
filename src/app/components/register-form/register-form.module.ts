import { NgModule } from '@angular/core';
import { RegisterFormComponent } from './register-form.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  exports: [RegisterFormComponent],
  declarations: [RegisterFormComponent],
})
export class RegisterFormModule {}
