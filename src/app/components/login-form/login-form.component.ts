import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  @Output() registerClicked = new EventEmitter<void>();

  formGroup!: FormGroup;
  submitted = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.formGroup.valid) {
      this.authService.loginUser(this.formGroup.value).subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: () => {
          this.toastr.error('Erro - usuário ou senha inválidos');
        },
      });
    } else {
      this.toastr.error('Erro - informações invalidas');
      console.log('Formulário inválido, exiba as mensagens de erro.');
    }
  }

  onRegisterClick(): void {
    this.registerClicked.emit();
  }

  isFieldInvalid(field: string) {
    const formControl = this.formGroup.get(field);
    return formControl?.invalid && this.submitted;
  }
}
