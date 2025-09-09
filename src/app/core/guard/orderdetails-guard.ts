import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { OrdersService } from './../../features/orders/services/orders.service';

export const orderdetailsGuard: CanActivateFn = (route, state) => {
  const ordersService = inject(OrdersService);
  const router = inject(Router);
  if (ordersService.ordersSubject.getValue().length == 0) {
    return router.parseUrl('/allorders');
  }
  return true;
};
