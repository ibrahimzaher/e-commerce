import { Product } from './../../../core/models/product.interface';
import { ProductsService } from './../../../core/services/products/products.service';
import { Component, inject, OnInit } from '@angular/core';
import { ProductComponent } from '../../../shared/components/product/product.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-popular-products',
  imports: [ProductComponent, NgxPaginationModule, TranslateModule],
  templateUrl: './popular-products.component.html',
  styleUrl: './popular-products.component.css',
})
export class PopularProductsComponent implements OnInit {
  p: number = 1;
  ngOnInit(): void {
    this.getProdutcs();
  }
  private readonly productsService = inject(ProductsService);
  products: Product[] = [];
  getProdutcs() {
    this.productsService.getProducts().subscribe({
      next: (res) => {
        this.products = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
