import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable, tap } from 'rxjs';
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
  user: WritableSignal<MyJwtPaylod | null> = signal<MyJwtPaylod | null>(null);

  //  signup , login , forgetpassword , resetcode ,updatepassword , updateLoggedUserData , resetPassword
  //  Not need to know data params this is formGroup

  signUp(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `auth/signup`, data).pipe(
      tap((res: any) => {
        if (res.message === 'success') {
          this.setToken(res.token);
          this.decodeToken();
        }
      })
    );
  }

  logIn(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `auth/signin`, data).pipe(
      tap((res: any) => {
        this.setToken(res.token);
        this.decodeToken();
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
      })
    );
  }

  updateLoggedUserData(data: object): Observable<any> {
    return this.httpClient.put(environment.baseUrl + `users/updateMe/`, data);
  }
  resetPassword(data: object): Observable<any> {
    return this.httpClient.put(environment.baseUrl + 'auth/resetPassword', data).pipe(
      tap((res: any) => {
        this.setToken(res.token);
        this.decodeToken();
      })
    );
  }

  signOut() {
    this.removeToken();
    this.user.set(null);
    this.router.navigate(['/login'], { replaceUrl: true });
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
      .pipe(tap(() => this.decodeToken()));
  }
  private decodeToken(): MyJwtPaylod | null {
    let userData: MyJwtPaylod | null = null;
    try {
      userData = jwtDecode(this.storageService.getItem('token')!);
      this.user.set(userData);
    } catch (error) {
      userData = null;
    }
    return userData;
  }
}
