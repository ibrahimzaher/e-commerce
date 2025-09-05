import { Component, Input, inject } from '@angular/core';
import { Product } from '../../../core/models/product.interface';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { WishlistService } from '../../../features/wishlist/servuces/wishlist.service';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  private readonly router = inject(Router);
  private readonly spinner = inject(NgxSpinnerService);
  private readonly wishlistService = inject(WishlistService);
  public wishlist$ = this.wishlistService.wishlistIds$;
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
  toggleWishlistProduct() {
    if (this.productWishList.includes(this.product._id)) {
      this.wishlistService.removeProduct(this.product._id).subscribe();
    } else {
      this.wishlistService.addProduct(this.product._id).subscribe();
    }
  }
}
