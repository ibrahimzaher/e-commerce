import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { Component, computed, inject, PLATFORM_ID, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { CartService } from './services/cart.service';
@Component({
  selector: 'app-cart',
  imports: [RouterLink, CurrencyPipe, TranslatePipe],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  private readonly cartService = inject(CartService);
  private readonly platformId = inject(PLATFORM_ID);
  isLoading = signal(true);
  cart = this.cartService.cart;
  totalItems = this.cartService.totalItems;
  totalPrice = this.cartService.totalPrice;
  cartId = computed(() => this.cart()?.cartId);
  cartItems = computed(() => this.cart()?.data?.products || []);
  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadCart();
    }
  }
  private loadCart() {
    this.isLoading.set(true);
    this.cartService.getUserLoggedCart().subscribe({
      next: () => this.isLoading.set(false),
      error: (error) => {
        this.isLoading.set(false);
        console.log(error);
      },
    });
  }
  deleteItem(productId: string) {
    this.cartService.removeProductFromCart(productId).subscribe();
  }
  updateItem(productId: string, count: number) {
    this.cartService.updateCartProductQuantity(productId, count).subscribe();
  }
  clearCart() {
    this.cartService.clearUserCart().subscribe();
  }
}
