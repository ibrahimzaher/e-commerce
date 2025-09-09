import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly httpClient = inject(HttpClient);
  getProducts(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `products`);
  }
  getProductsPagination(pageNumber: number): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `products?page=${pageNumber}`);
  }
}
