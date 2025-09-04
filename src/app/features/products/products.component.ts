import { Product } from '../../core/models/product.interface';
import { ProductsService } from './../../core/services/products/products.service';
import { Component, inject, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { ProductComponent } from '../../shared/components/product/product.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-products',
  imports: [ProductComponent, NgxPaginationModule, TranslateModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  private readonly ProductsService = inject(ProductsService);

  products: Product[] = [];
  displayedProducts: Product[] = [];
  p: number = 1;
  pageSize: number = 6;
  total: number = 0;
  apiPage: number = 1;

  ngOnInit(): void {
    this.loadMoreProducts();
  }

  loadMoreProducts() {
    this.ProductsService.getProductsPagination(this.apiPage).subscribe({
      next: (res) => {
        this.products = [...this.products, ...res.data];
        this.total = this.products.length;
        this.apiPage++;
      },
      error: (err) => console.log(err),
    });
  }

  pageChange(pageNumber: number) {
    this.p = pageNumber;

    const maxLoadedPages = Math.ceil(this.products.length / this.pageSize);
    if (this.p > maxLoadedPages - 1) {
      this.loadMoreProducts();
    }
  }
}
