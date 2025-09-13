import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../core/auth/services/auth/auth.service';
import { OrdersService } from './services/orders.service';

@Component({
  selector: 'app-orders',
  imports: [CurrencyPipe, DatePipe, RouterLink, TranslatePipe, NgClass],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly ordersService = inject(OrdersService);

  user = this.authService.user;
  orders = this.ordersService.orderSignal;
  hasLoaded = signal(false);

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders() {
    const id = this.user()?.id;
    if (!id) return;

    this.ordersService.getAllOrders(id).subscribe({
      next: () => {
        this.hasLoaded.set(true);
      },
      error: () => this.hasLoaded.set(true),
    });
  }
}
