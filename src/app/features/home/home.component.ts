import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Product } from '../../core/models/product.interface';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private readonly productService = inject(ProductsService);
  products: Product[] = [];
  isLoadng: boolean = false;
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loadProducts();
  }
  loadProducts(): void {
    this.isLoadng = true;
    this.productService
      .getProducts()
      .pipe(finalize(() => (this.isLoadng = false)))
      .subscribe({
        next: (res) => {
          this.products = res.data;
          console.log(this.products);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
