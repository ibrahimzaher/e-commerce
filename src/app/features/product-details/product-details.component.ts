import { CartService } from './../cart/services/cart.service';
import { ProductDetailsService } from './services/product-details/product-details.service';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { Product } from '../../core/models/product.interface';
import { TranslateModule } from '@ngx-translate/core';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [TranslateModule, SlicePipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  productDetails: Product = {} as Product;
  private readonly cartService = inject(CartService);
  constructor(private readonly activatedRoute: ActivatedRoute) {}
  ngOnInit(): void {
    this.productDetails = this.activatedRoute.snapshot.data['product'].data;
  }
  addToCart() {
    this.cartService.addProductToCart(this.productDetails._id).subscribe();
  }
}
