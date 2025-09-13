import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { finalize } from 'rxjs';
import { InputComponent } from '../../../shared/components/input/input.component';
import { AuthService } from './../services/auth/auth.service';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, InputComponent, RouterLink, TranslatePipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  registerForm!: FormGroup;
  isLoading: WritableSignal<boolean> = signal(false);
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
      this.isLoading.set(true);
      this.authService
        .signUp(this.registerForm.value)
        .pipe(finalize(() => this.isLoading.set(false)))
        .subscribe({
          next: () => {
            this.router.navigate(['/home'], { replaceUrl: true });
          },
        });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
