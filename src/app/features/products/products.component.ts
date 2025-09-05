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
  p: number = 1;
  pageSize!: number;
  total!: number;
  apiPage: number = 1;

  ngOnInit(): void {
    this.loadMoreProducts(this.apiPage);
  }

  loadMoreProducts(pageNumber: number) {
    this.ProductsService.getProductsPagination(pageNumber).subscribe({
      next: (res) => {
        console.log(res);
        this.pageSize = res.metadata.limit;
        this.products = res.data;
        this.total = res.results;
        this.apiPage++;
      },
      error: (err) => console.log(err),
    });
  }

  pageChange(pageNumber: number) {
    this.p = pageNumber;
    this.loadMoreProducts(pageNumber);
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
