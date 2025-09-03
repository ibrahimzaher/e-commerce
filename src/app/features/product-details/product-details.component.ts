import { ProductDetailsService } from './services/product-details/product-details.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { Product } from '../../core/models/product.interface';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-product-details',
  imports: [TranslateModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  productDetails: Product = {} as Product;
  constructor(private readonly activatedRoute: ActivatedRoute) {}
  ngOnInit(): void {
    this.productDetails = this.activatedRoute.snapshot.data['product'].data;
  }
}
