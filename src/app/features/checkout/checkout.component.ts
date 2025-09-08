import { CartService } from './../cart/services/cart.service';
import { CheckoutService } from './service/checkout.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../shared/components/input/input.component';
import { log } from 'console';
import { switchMap } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, InputComponent, TranslatePipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly casrtService = inject(CartService);
  public cartid: string = this.activatedRoute.snapshot.paramMap.get('cart_id')!;
  address!: FormGroup;
  paymentMethod!: FormControl;
  private readonly checkoutService = inject(CheckoutService);
  ngOnInit(): void {
    console.log(this.cartid);
    this.initForm();
    console.log(this.address);
  }
  initForm() {
    this.address = this.fb.group({
      shippingAddress: this.fb.group({
        details: [null, [Validators.required]],
        phone: [null, [Validators.required, Validators.pattern(/^(?:\+20|0)?(10|11|12|15)\d{8}$/)]],
        city: [null, [Validators.required, Validators.minLength(3)]],
      }),
    });
    this.paymentMethod = this.fb.control('cash');
  }
  submit() {
    if (this.address.valid) {
      if (this.paymentMethod.value == 'cash') {
        this.checkoutService
          .creatCashOrder(this.cartid, this.address.value)
          .pipe(switchMap(() => this.casrtService.getUserLoggedCart()))
          .subscribe({
            next: (res) => {
              this.router.navigate(['/allorders']);
            },
          });
      } else {
        this.checkoutService.checkoutSessionPayment(this.cartid, this.address.value).subscribe({
          next: (res) => {
            console.log(res);
            window.open(res.session.url, '_self');
          },
        });
      }
    } else {
      this.address.markAllAsTouched();
    }
  }
}
