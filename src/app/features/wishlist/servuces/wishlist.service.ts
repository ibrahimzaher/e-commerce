import { HttpClient } from '@angular/common/http';
import {
  inject,
  Injectable,
  signal,
  WritableSignal,
  computed,
  PLATFORM_ID,
  OnInit,
} from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Product } from '../../../core/models/product.interface';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private readonly httpClient = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly _wishlistIds: WritableSignal<string[]> = signal([]);
  private readonly _wishlistProducts: WritableSignal<Product[]> = signal([]);

  readonly wishlistIds = this._wishlistIds.asReadonly();
  readonly wishlistProducts = this._wishlistProducts.asReadonly();

  readonly isEmpty = computed(() => this._wishlistProducts().length === 0);

  loadWishlist(): Observable<any> {
    return this.httpClient.get<{ data: Product[] }>(environment.baseUrl + 'wishlist').pipe(
      tap((res) => {
        this._wishlistProducts.set(res.data);
        this._wishlistIds.set(res.data.map((p) => p._id));
      })
    );
  }

  removeProduct(productId: string): Observable<any> {
    return this.httpClient
      .delete<{ data: string[] }>(environment.baseUrl + `wishlist/${productId}`)
      .pipe(
        tap((res) => {
          this._wishlistIds.set(res.data);
          this._wishlistProducts.update((products) => products.filter((p) => p._id !== productId));
        })
      );
  }

  addProduct(productId: string, product?: Product): Observable<any> {
    return this.httpClient
      .post<{ data: string[] }>(environment.baseUrl + 'wishlist', { productId })
      .pipe(
        tap((res) => {
          this._wishlistIds.set(res.data);
          if (product) {
            const exists = this._wishlistProducts().some((p) => p._id === productId);
            if (!exists) {
              this._wishlistProducts.update((products) => [...products, product]);
            }
          }
        })
      );
  }

  isInWishlist(productId: string): boolean {
    return this._wishlistIds().includes(productId);
  }
}
