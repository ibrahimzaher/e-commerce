import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductComponent } from '../../../shared/components/product/product.component';
import { Product } from './../../../core/models/product.interface';
import { ProductsService } from './../../../core/services/products/products.service';

@Component({
  selector: 'app-popular-products',
  imports: [ProductComponent, NgxPaginationModule, TranslateModule],
  templateUrl: './popular-products.component.html',
  styleUrl: './popular-products.component.css',
})
export class PopularProductsComponent implements OnInit {
  p: WritableSignal<number> = signal<number>(1);
  products: WritableSignal<Product[]> = signal([]);

  private readonly productsService = inject(ProductsService);
  constructor() {}
  ngOnInit(): void {
    this.productsService.getProducts().subscribe({ next: (val) => this.products.set(val) });
  }
}
