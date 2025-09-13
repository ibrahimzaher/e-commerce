import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { OrdersService } from './../../features/orders/services/orders.service';

export const orderdetailsGuard: CanActivateFn = (route, state) => {
  const ordersService = inject(OrdersService);
  const router = inject(Router);
  return ordersService.orderSignal().length === 0 ? router.parseUrl('/allorders') : true;
};
