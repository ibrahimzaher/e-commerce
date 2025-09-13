import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal, computed } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Cart } from '../model/cart.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly httpClient = inject(HttpClient);

  private readonly _cart: WritableSignal<Cart | null> = signal(null);
  readonly cart = this._cart.asReadonly();

  readonly totalItems = computed(() => this._cart()?.numOfCartItems ?? 0);

  readonly totalPrice = computed(() => this._cart()?.data?.totalCartPrice ?? 0);

  constructor() {}

  getUserLoggedCart(): Observable<Cart> {
    return this.httpClient.get<Cart>(environment.baseUrl + 'cart').pipe(
      tap((res) => {
        if (res.status === 'success') {
          this._cart.set(res);
        }
      })
    );
  }

  addProductToCart(productId: string): Observable<Cart> {
    return this.httpClient.post<Cart>(environment.baseUrl + 'cart', { productId }).pipe(
      tap((res) => {
        if (res.status === 'success') {
          this._cart.set(res);
        }
      })
    );
  }

  updateCartProductQuantity(productId: string, count: number): Observable<Cart> {
    return this.httpClient.put<Cart>(`${environment.baseUrl}cart/${productId}`, { count }).pipe(
      tap((res) => {
        if (res.status === 'success') {
          this._cart.set(res);
        }
      })
    );
  }

  removeProductFromCart(productId: string): Observable<Cart> {
    return this.httpClient.delete<Cart>(`${environment.baseUrl}cart/${productId}`).pipe(
      tap((res) => {
        if (res.status === 'success') {
          this._cart.set(res);
        }
      })
    );
  }

  clearUserCart(): Observable<Cart> {
    return this.httpClient
      .delete<Cart>(environment.baseUrl + 'cart')
      .pipe(tap(() => this._cart.set(null)));
  }
}
