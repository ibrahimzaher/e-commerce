import { inject } from '@angular/core';
import { OrdersService } from './../../features/orders/services/orders.service';
import { ActivatedRoute, CanActivateFn, Router } from '@angular/router';

export const orderdetailsGuard: CanActivateFn = (route, state) => {
  const ordersService = inject(OrdersService);
  const router = inject(Router);
  if (ordersService.ordersSubject.getValue().length == 0) {
    return router.parseUrl('/allorders');
  }
  return true;
};
