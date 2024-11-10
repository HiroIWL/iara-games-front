import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isRegisterMode = false;
  isLoading = true;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;

      if (this.authService.isAuthenticated()) {
        this.router.navigate(['/home']);
      }
    }, 1500);
  }

  switchToRegister(): void {
    this.isRegisterMode = true;
  }

  switchToLogin(): void {
    this.isRegisterMode = false;
  }
}
