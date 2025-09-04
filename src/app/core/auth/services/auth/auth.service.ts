import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { JwtPayload } from './../../../../../../node_modules/jwt-decode/build/esm/index.d';
import { StorageService } from './../../../services/storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly storageService = inject(StorageService);
  private readonly router = inject(Router);
  login = new BehaviorSubject<JwtPayload | null>(null);
  constructor() {
    this.login.next(this.decodeToken());
  }
  signUp(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `auth/signup`, data);
  }
  logIn(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `auth/signin`, data);
  }
  forgetPassword(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + 'auth/forgotPasswords', data);
  }
  resetCode(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + 'auth/verifyResetCode', data);
  }
  resetPassword(data: object): Observable<any> {
    return this.httpClient.put(environment.baseUrl + 'auth/resetPassword', data);
  }
  signOut() {
    this.removeToken();
    this.login.next(null);
    this.router.navigate(['login'], { replaceUrl: true });
  }
  setToken(tokenValue: string) {
    this.storageService.setItem('token', tokenValue);
  }
  getToken() {
    return this.storageService.getItem('token');
  }
  removeToken() {
    this.storageService.removeItem('token');
  }
  verifyToken(token: string): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `auth/verifyToken`, {
      headers: {
        token: token,
      },
    });
  }
  decodeToken(): JwtPayload | null {
    let userData: JwtPayload | null = null;
    try {
      userData = jwtDecode(this.storageService.getItem('token')!);
    } catch (error) {
      userData = null;
    }
    return userData;
  }
}
