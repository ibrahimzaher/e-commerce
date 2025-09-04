import { Component, Input, inject } from '@angular/core';
import { Product } from '../../../core/models/product.interface';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  private readonly router = inject(Router);
  private readonly spinner = inject(NgxSpinnerService);
  ngOnInit(): void {}
  @Input({ required: true }) product: Product = {} as Product;
  navigateToDetails() {
    this.router.navigate(['/product', this.product._id, this.product.slug]);
  }
}
