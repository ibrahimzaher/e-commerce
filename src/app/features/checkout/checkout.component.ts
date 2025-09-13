import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { switchMap } from 'rxjs';
import { InputComponent } from '../../shared/components/input/input.component';
import { CartService } from './../cart/services/cart.service';
import { CheckoutService } from './service/checkout.service';

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
  public cartid: Signal<string> = signal(this.activatedRoute.snapshot.paramMap.get('cart_id')!);
  address!: FormGroup;
  paymentMethod!: FormControl;
  private readonly checkoutService = inject(CheckoutService);
  ngOnInit(): void {
    this.initForm();
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
          .creatCashOrder(this.cartid(), this.address.value)
          .pipe(switchMap(() => this.casrtService.getUserLoggedCart()))
          .subscribe({
            next: () => {
              this.router.navigate(['/allorders']);
            },
          });
      } else {
        this.checkoutService.checkoutSessionPayment(this.cartid(), this.address.value).subscribe({
          next: (res) => {
            window.open(res.session.url, '_self');
          },
        });
      }
    } else {
      this.address.markAllAsTouched();
    }
  }
}
