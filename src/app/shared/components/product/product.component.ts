import { Component, Input, inject } from '@angular/core';
import { Product } from '../../../core/models/product.interface';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { WishlistService } from '../../../features/wishlist/servuces/wishlist.service';
import { CartService } from '../../../features/cart/services/cart.service';
import { CurrencyPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

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
  public wishlist$ = this.wishlistService.wishlistIds$;
  private readonly cartService = inject(CartService);

  productWishList: string[] = [];
  ngOnInit(): void {
    this.wishlist$.subscribe({
      next: (res) => {
        this.productWishList = res;
      },
    });
  }
  @Input({ required: true }) product: Product = {} as Product;
  navigateToDetails() {
    this.router.navigate(['/product', this.product._id, this.product.slug]);
  }
  addToCart() {
    this.cartService.addProductToCart(this.product._id).subscribe({
      next: (res) => console.log(res),
      error: (error) => console.log(error),
    });
  }
  toggleWishlistProduct() {
    if (this.productWishList.includes(this.product._id)) {
      this.wishlistService.removeProduct(this.product._id).subscribe();
    } else {
      this.wishlistService.addProduct(this.product._id).subscribe();
    }
  }
}
