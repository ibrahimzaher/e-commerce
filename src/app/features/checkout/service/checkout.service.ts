import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

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
