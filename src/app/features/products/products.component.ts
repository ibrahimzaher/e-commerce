import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { Product } from '../../core/models/product.interface';
import { InputComponent } from '../../shared/components/input/input.component';
import { ProductComponent } from '../../shared/components/product/product.component';
import { SearchPipe } from '../../shared/pipes/search-pipe';
import { ProductsService } from './../../core/services/products/products.service';

@Component({
  selector: 'app-products',
  imports: [
    NgxPaginationModule,
    TranslateModule,
    InputComponent,
    ReactiveFormsModule,
    SearchPipe,
    ProductComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  private readonly ProductsService = inject(ProductsService);
  searchControl!: FormControl;
  products: Product[] = [];
  p: number = 1;
  pageSize!: number;
  total!: number;
  apiPage: number = 1;

  ngOnInit(): void {
    this.searchControl = new FormControl('');
    this.loadMoreProducts(this.apiPage);
  }

  loadMoreProducts(pageNumber: number) {
    this.ProductsService.getProductsPagination(pageNumber).subscribe({
      next: (res) => {
        this.pageSize = res.metadata.limit;
        this.products = res.data;
        this.total = res.results;
        this.apiPage++;
      },
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
