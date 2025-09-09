import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { MyJwtPaylod } from '../../models/my-jwt-paylod.interface';
import { StorageService } from './../../../services/storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly storageService = inject(StorageService);
  private readonly router = inject(Router);
  user: BehaviorSubject<MyJwtPaylod | null> = new BehaviorSubject<MyJwtPaylod | null>(null);
  user$: Observable<MyJwtPaylod | null> = this.user.asObservable();
  constructor() {}
  signUp(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `auth/signup`, data).pipe(
      tap((res: any) => {
        if (res.message === 'success') {
          this.setToken(res.token);
          this.decodeToken();
          this.router.navigate(['home'], { replaceUrl: true });
        }
      })
    );
  }
  logIn(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `auth/signin`, data).pipe(
      tap((res: any) => {
        this.setToken(res.token);
        this.decodeToken();
        this.router.navigate(['/home']);
      })
    );
  }
  forgetPassword(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + 'auth/forgotPasswords', data);
  }
  resetCode(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + 'auth/verifyResetCode', data);
  }
  updatePassword(data: object): Observable<any> {
    return this.httpClient.put(environment.baseUrl + `users/changeMyPassword`, data).pipe(
      tap((res: any) => {
        this.setToken(res.token);
        this.decodeToken();
        this.router.navigate(['/home']);
      })
    );
  }
  updateLoggedUserData(data: object): Observable<any> {
    return this.httpClient.put(environment.baseUrl + `users/updateMe/`, data).pipe(
      tap((res: any) => {
        this.router.navigate(['/home']);
      })
    );
  }
  resetPassword(data: object): Observable<any> {
    return this.httpClient.put(environment.baseUrl + 'auth/resetPassword', data).pipe(
      tap((res: any) => {
        this.setToken(res.token);
        this.decodeToken();
        this.router.navigate(['/home']);
      })
    );
  }

  signOut() {
    this.removeToken();
    this.user.next(null);
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
    return this.httpClient
      .get(environment.baseUrl + `auth/verifyToken`, {
        headers: {
          token: token,
        },
      })
      .pipe(
        tap(() => {
          this.decodeToken();
        })
      );
  }
  decodeToken(): MyJwtPaylod | null {
    let userData: MyJwtPaylod | null = null;
    try {
      userData = jwtDecode(this.storageService.getItem('token')!);
      this.user.next(userData);
    } catch (error) {
      userData = null;
    }
    return userData;
  }
}
