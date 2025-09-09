import { CommonModule, CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
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
  order!: Order;
  id!: string;
  private readonly activatedRoute = inject(ActivatedRoute);
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.order = this.OrdersService.ordersSubject
      .getValue()
      .find((order) => order._id === this.id)!;
  }
}
