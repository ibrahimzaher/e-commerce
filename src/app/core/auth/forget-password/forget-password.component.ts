import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { finalize } from 'rxjs';
import { InputComponent } from '../../../shared/components/input/input.component';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-forget-password',
  imports: [InputComponent, ReactiveFormsModule, TranslatePipe],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
})
export class ForgetPasswordComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  steps: WritableSignal<number> = signal<number>(1);
  loading: WritableSignal<boolean> = signal<boolean>(false);
  forgetPasswordForm!: FormGroup;
  resetCodeForm!: FormGroup;
  resetPasswordForm!: FormGroup;

  ngOnInit(): void {
    this.initForms();
  }
  initForms() {
    this.forgetPasswordForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
    });
    this.resetCodeForm = this.fb.group({
      resetCode: [null, [Validators.required]],
    });
    this.resetPasswordForm = this.fb.group({
      email: [null, [Validators.required]],
      newPassword: [null, [Validators.required, Validators.pattern(/^.{6,}$/)]],
    });
  }
  forgetPassword() {
    if (this.forgetPasswordForm.valid) {
      this.loading.set(true);

      this.authService
        .forgetPassword(this.forgetPasswordForm.value)
        .pipe(finalize(() => this.loading.set(false)))
        .subscribe({
          next: () => {
            this.steps.update((val) => val + 1);
          },
        });
    } else {
      this.forgetPasswordForm.markAllAsTouched();
    }
  }
  resetCode() {
    if (this.resetCodeForm.valid) {
      this.loading.set(true);

      this.authService
        .resetCode(this.resetCodeForm.value)
        .pipe(finalize(() => this.loading.set(false)))
        .subscribe({
          next: () => {
            this.steps.update((val) => val + 1);
            this.resetPasswordForm
              .get('email')
              ?.patchValue(this.forgetPasswordForm.get('email')?.value);
          },
        });
    } else {
      this.resetCodeForm.markAllAsTouched();
    }
  }
  resetPassword() {
    if (this.resetPasswordForm.valid) {
      this.loading.set(true);

      this.authService
        .resetPassword(this.resetPasswordForm.value)
        .pipe(finalize(() => this.loading.set(false)))
        .subscribe({
          next: () => {
            this.router.navigate(['/login'], { replaceUrl: true });
          },
        });
    } else {
      this.resetPasswordForm.markAllAsTouched();
    }
  }
}
