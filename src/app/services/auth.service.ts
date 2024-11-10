import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user.model';
import { tap } from 'rxjs';
import { LoginResponseModel } from '../models/login-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://127.0.0.1:8000';

  constructor(private httpClient: HttpClient) {}

  registerUser(user: UserModel) {
    return this.httpClient.post(this.url + '/register', user);
  }

  loginUser(user: Partial<UserModel>) {
    return this.httpClient
      .post(this.url + '/login', {
        username: user.email,
        password: user.password,
      })
      .pipe(
        tap((response) => {
          localStorage.setItem('token', (response as LoginResponseModel).token);
          localStorage.setItem(
            'user',
            JSON.stringify((response as LoginResponseModel).user),
          );
        }),
      );
  }

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }
}
