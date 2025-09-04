// src/app/resolvers/user.resolver.ts
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { ProductDetailsService } from '../services/product-details/product-details.service';

export const productDetailsResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const productDetailsService = inject(ProductDetailsService);
  const id = route.paramMap.get('id');

  if (id) {
    return productDetailsService.getSpecificProduct(id);
  } else {
    throw new Error('User ID not found in route parameters.');
  }
};
