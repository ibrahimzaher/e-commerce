import { finalize, pipe } from 'rxjs';
import { Component, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ProductComponent } from '../../shared/components/product/product.component';
import { WishlistService } from './servuces/wishlist.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [ProductComponent, TranslatePipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent implements OnInit {
  private readonly wishlistService = inject(WishlistService);
  private readonly platformId = inject(PLATFORM_ID);

  products = this.wishlistService.wishlistProducts;
  isEmpty = this.wishlistService.isEmpty;
  isLoaded = signal<boolean>(true);
  ngOnInit(): void {
    this.isLoaded.set(true);
    if (isPlatformBrowser(this.platformId)) {
      this.wishlistService
        .loadWishlist()
        .pipe(finalize(() => this.isLoaded.set(false)))
        .subscribe();
    }
  }
}
