import { CommonModule, CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Order } from '../orders/models/order.interface';
import { OrdersService } from './../orders/services/orders.service';

@Component({
  selector: 'app-order-details',
  imports: [NgClass, CurrencyPipe, DatePipe, CommonModule, TranslatePipe],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css',
})
export class OrderDetailsComponent {
  private readonly OrdersService = inject(OrdersService);
  order: WritableSignal<Order> = signal({} as Order);
  id: WritableSignal<string> = signal('');
  private readonly activatedRoute = inject(ActivatedRoute);
  ngOnInit() {
    this.id.set(this.activatedRoute.snapshot.paramMap.get('id')!);
    this.order.set(this.OrdersService.orderSignal().find((order) => order._id === this.id())!);
  }
}
