import { StorageService } from './../../services/storage/storage.service';
import { finalize, Subscription } from 'rxjs';
import { AuthService } from './../services/auth/auth.service';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../../../shared/components/input/input.component';
import { log } from 'console';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, InputComponent, RouterLink, TranslatePipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit, OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly storageService = inject(StorageService);
  private readonly router = inject(Router);
  registerForm!: FormGroup;
  isLoading: boolean = false;
  subscription: Subscription = new Subscription();
  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.registerForm = this.fb.group(
      {
        name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.pattern(/^.{6,}$/)]],
        rePassword: [null, [Validators.required]],
        phone: [null, [Validators.required, Validators.pattern(/^(?:\+20|0)?(10|11|12|15)\d{8}$/)]],
      },
      {
        validators: [this.mismatch],
      }
    );
  }
  mismatch(group: AbstractControl) {
    if (group.get('password')?.value === group.get('rePassword')?.value) {
      return null;
    } else {
      group.get('rePassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
  }
  signUp() {
    if (this.registerForm.valid) {
      this.subscription.unsubscribe();
      this.isLoading = true;
      this.subscription = this.authService
        .signUp(this.registerForm.value)
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe({
          next: (res) => {
            console.log(res);
          },
        });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
