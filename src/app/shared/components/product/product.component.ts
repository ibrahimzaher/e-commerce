import { CurrencyPipe } from '@angular/common';
import { Component, Input, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Product } from '../../../core/models/product.interface';
import { CartService } from '../../../features/cart/services/cart.service';
import { WishlistService } from '../../../features/wishlist/servuces/wishlist.service';

@Component({
  selector: 'app-product',
  imports: [CurrencyPipe, TranslatePipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  private readonly router = inject(Router);
  private readonly spinner = inject(NgxSpinnerService);
  private readonly wishlistService = inject(WishlistService);
  public wishlistIds = this.wishlistService.wishlistIds;
  private readonly cartService = inject(CartService);

  productWishList = computed(() => this.wishlistIds());
  ngOnInit(): void {}
  @Input({ required: true }) product: Product = {} as Product;
  navigateToDetails() {
    this.router.navigate(['/product', this.product._id, this.product.slug]);
  }
  addToCart() {
    this.cartService.addProductToCart(this.product._id).subscribe({});
  }
  toggleWishlistProduct() {
    if (this.productWishList().includes(this.product._id)) {
      this.wishlistService.removeProduct(this.product._id).subscribe();
    } else {
      this.wishlistService.addProduct(this.product._id, this.product).subscribe();
    }
  }
}
