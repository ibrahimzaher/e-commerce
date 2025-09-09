import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Order } from '../models/order.interface';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private readonly httpClient = inject(HttpClient);
  ordersSubject = new BehaviorSubject<Order[]>([]);
  getAllOrders(user_id: string): Observable<Order[]> {
    return this.httpClient
      .get<Order[]>(environment.baseUrl + `orders/user/${user_id}`)
      .pipe(tap((res) => this.ordersSubject.next(res)));
  }
}
