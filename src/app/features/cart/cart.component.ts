import { Subscription } from 'rxjs';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';
import { Cart } from './model/cart.interface';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, CurrencyPipe, TranslatePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit, OnDestroy {
  private readonly cartService = inject(CartService);
  private readonly cart$ = this.cartService.cart$;

  cart: Cart | null = null;
  private subscription = new Subscription();

  ngOnInit(): void {
    this.subscription.add(
      this.cart$.subscribe({
        next: (res) => {
          this.cart = res;
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get cartItems() {
    return this.cart?.data?.products || [];
  }

  deleteItem(productId: string) {
    this.subscription.add(this.cartService.removeProductFromCart(productId).subscribe());
  }

  updateItem(productId: string, count: number) {
    this.subscription.add(this.cartService.updateCartProductQuantity(productId, count).subscribe());
  }
  clearCart() {
    this.subscription.add(this.cartService.clearUserCart().subscribe());
  }
}
