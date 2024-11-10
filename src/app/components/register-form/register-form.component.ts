import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  @Output() loginClicked = new EventEmitter<void>();

  formGroup!: FormGroup;
  submitted = false;

  constructor(private authService: AuthService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.formGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.formGroup.valid) {
      const { name, username, email, password } = this.formGroup.getRawValue();
      this.authService
        .registerUser({
          name,
          username,
          email,
          password,
        })
        .subscribe({
          next: () => {
            this.toastr.success('Usuário cadastrado com sucesso!');
            this.loginClicked.emit();
          },
          error: (error) => {
            this.toastr.error('Erro ao cadastrar usuário!');
            console.error(error);
          },
        });
    } else {
      console.log('Formulário inválido, exiba as mensagens de erro.');
    }
  }

  onLoginClick(): void {
    this.loginClicked.emit();
  }

  isFieldInvalid(field: string) {
    const formControl = this.formGroup.get(field);
    return formControl?.invalid && this.submitted;
  }

  doPasswordsMatch(): boolean {
    return (
      this.formGroup.get('password')?.value ===
      this.formGroup.get('confirmPassword')?.value
    );
  }
}
