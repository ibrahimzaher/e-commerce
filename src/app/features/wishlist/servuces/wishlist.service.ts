import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { Product } from '../../../core/models/product.interface';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private readonly httpClient = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);

  // 👇 Internal subjects
  private readonly _wishlistIds = new BehaviorSubject<string[]>([]);
  private readonly _wishlistProducts = new BehaviorSubject<Product[]>([]);

  // 👇 Public observables (exposed to components)
  public readonly wishlistIds$ = this._wishlistIds.asObservable();
  public readonly wishlistProducts$ = this._wishlistProducts.asObservable();

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadWishlist().subscribe();
    }
  }

  /** Fetch wishlist products from API */
  loadWishlist(): Observable<any> {
    return this.httpClient.get<{ data: Product[] }>(environment.baseUrl + 'wishlist').pipe(
      tap((res) => {
        this._wishlistProducts.next(res.data);
        this._wishlistIds.next(res.data.map((p) => p._id));
      })
    );
  }

  /** Remove a product from wishlist */
  removeProduct(productId: string): Observable<any> {
    return this.httpClient
      .delete<{ data: string[] }>(environment.baseUrl + `wishlist/${productId}`)
      .pipe(
        tap((res) => {
          this._wishlistIds.next(res.data);
          // const current = this._wishlistProducts.value;
          // this._wishlistProducts.next(current.filter((p) => p._id !== productId));
          this.loadWishlist().subscribe();
        })
      );
  }

  /** Add a product to wishlist */
  addProduct(productId: string): Observable<any> {
    return this.httpClient
      .post<{ data: string[] }>(environment.baseUrl + 'wishlist', { productId })
      .pipe(
        tap((res) => {
          this._wishlistIds.next(res.data);
          this.loadWishlist().subscribe();
        })
      );
  }
}
