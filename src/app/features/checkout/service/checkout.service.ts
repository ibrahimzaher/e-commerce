import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private readonly httpClient = inject(HttpClient);
  creatCashOrder(cartId: string, data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `orders/${cartId}`, data);
  }
  checkoutSessionPayment(cartId: string, data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `orders/checkout-session/${cartId}`, data, {
      params: {
        url: environment.domain,
      },
    });
  }
}
