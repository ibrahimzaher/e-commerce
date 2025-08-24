import { Component, Input, inject } from '@angular/core';
import { Product } from '../../../core/models/product.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  private readonly router = inject(Router);
  isLoading = false;
  @Input({ required: true }) product: Product = {} as Product;
  navigateToDetails() {
    this.isLoading = true;
    this.router.navigate(['/product', this.product._id, this.product.slug]);
  }
}
