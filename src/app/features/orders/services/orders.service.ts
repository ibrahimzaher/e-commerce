import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Order } from '../models/order.interface';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private readonly httpClient = inject(HttpClient);
  private readonly _orderSignal: WritableSignal<Order[]> = signal([]);
  readonly orderSignal = this._orderSignal.asReadonly();

  getAllOrders(user_id: string): Observable<Order[]> {
    return this.httpClient.get<Order[]>(environment.baseUrl + `orders/user/${user_id}`).pipe(
      tap((res) => {
        this._orderSignal.set(res);
      })
    );
  }
}
