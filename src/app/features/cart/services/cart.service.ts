import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Cart } from '../model/cart.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly httpClient = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  cart: BehaviorSubject<Cart | null> = new BehaviorSubject<Cart | null>(null);
  cart$: Observable<Cart | null> = this.cart.asObservable();
  constructor() {}
  getUserLoggedCart(): Observable<Cart> {
    return this.httpClient.get<Cart>(environment.baseUrl + 'cart').pipe(
      tap((res) => {
        if (res.status === 'success') {
          this.cart.next(res);
        }
      })
    );
  }
  addProductToCart(productId: string): Observable<Cart> {
    return this.httpClient
      .post<Cart>(environment.baseUrl + 'cart', {
        productId: productId,
      })
      .pipe(switchMap(() => this.getUserLoggedCart()));
  }
  updateCartProductQuantity(productId: string, count: number): Observable<Cart> {
    return this.httpClient
      .put<Cart>(environment.baseUrl + `cart/${productId}`, {
        count: count,
      })
      .pipe(switchMap(() => this.getUserLoggedCart()));
  }
  removeProductFromCart(productId: string): Observable<Cart> {
    return this.httpClient
      .delete<Cart>(environment.baseUrl + `cart/${productId}`)
      .pipe(switchMap(() => this.getUserLoggedCart()));
  }
  clearUserCart(): Observable<any> {
    return this.httpClient
      .delete(environment.baseUrl + `cart`)
      .pipe(switchMap(() => this.getUserLoggedCart()));
  }
}
