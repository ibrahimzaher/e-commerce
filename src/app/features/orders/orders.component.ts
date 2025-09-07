import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { MyJwtPaylod } from '../../core/auth/models/my-jwt-paylod.interface';
import { AuthService } from './../../core/auth/services/auth/auth.service';
import { Order } from './models/order.interface';
import { OrdersService } from './services/orders.service';

@Component({
  selector: 'app-orders',
  imports: [CurrencyPipe, DatePipe, RouterLink, TranslatePipe, NgClass],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent {
  private readonly authService = inject(AuthService);
  private readonly ordersService = inject(OrdersService);
  user!: MyJwtPaylod;
  orders: Order[] = [];
  isData = false;
  ngOnInit(): void {
    this.user = this.authService.decodeToken()!;
    this.getAllOrders();
  }
  getAllOrders() {
    if (this.user) {
      this.ordersService.getAllOrders(this.user.id).subscribe({
        next: (res) => {
          this.isData = true;
          this.orders = res;
          console.log(res[0]);
        },
      });
    }
  }
}
