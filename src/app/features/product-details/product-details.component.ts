import { SlicePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Product } from '../../core/models/product.interface';
import { CartService } from './../cart/services/cart.service';

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
