import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Product } from '../../core/models/product.interface';
import { ProductComponent } from '../../shared/components/product/product.component';
import { WishlistService } from './servuces/wishlist.service';

@Component({
  selector: 'app-wishlist',
  imports: [ProductComponent, TranslatePipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent {
  private readonly wishlistService = inject(WishlistService);
  public wishlistproducts: Observable<Product[]> = this.wishlistService.wishlistProducts$;
  products: Product[] = [];
  loading = true;
  ngOnInit(): void {
    this.loading = true;
    this.wishlistproducts.subscribe({
      next: (res) => {
        this.products = res;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }
}
