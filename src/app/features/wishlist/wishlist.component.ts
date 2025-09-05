import { Product } from '../../core/models/product.interface';
import { WishlistService } from './servuces/wishlist.service';
import { Component, inject } from '@angular/core';
import { ProductComponent } from '../../shared/components/product/product.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-wishlist',
  imports: [ProductComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent {
  private readonly wishlistService = inject(WishlistService);
  public wishlistproducts: Observable<Product[]> = this.wishlistService.wishlistProducts$;
  products: Product[] = [];
  ngOnInit(): void {
    this.wishlistproducts.subscribe({
      next: (res) => (this.products = res),
    });
  }
}
