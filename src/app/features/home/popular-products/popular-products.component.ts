import { finalize } from 'rxjs';
import { Product } from './../../../core/models/product.interface';
import { ProductsService } from './../../../core/services/products/products.service';
import { Component, inject, OnInit } from '@angular/core';
import { ProductComponent } from '../../../shared/components/product/product.component';

@Component({
  selector: 'app-popular-products',
  imports: [ProductComponent],
  templateUrl: './popular-products.component.html',
  styleUrl: './popular-products.component.css',
})
export class PopularProductsComponent implements OnInit {
  ngOnInit(): void {
    this.getProdutcs();
  }
  private readonly productsService = inject(ProductsService);
  products: Product[] = [];
  isLoading: boolean = false;
  getProdutcs() {
    this.isLoading = true;
    this.productsService
      .getProducts()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (res) => {
          this.products = res.data;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
