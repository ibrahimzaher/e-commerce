import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Product } from '../../models/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly httpClient = inject(HttpClient);
  getProducts(): Observable<Product[]> {
    return this.httpClient.get(environment.baseUrl + `products`).pipe(map((res: any) => res.data));
  }
  getProductsPagination(pageNumber: number): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `products?page=${pageNumber}`);
  }
}
