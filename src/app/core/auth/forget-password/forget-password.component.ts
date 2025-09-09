import { Component, inject, OnInit } from '@angular/core';
import { InputComponent } from '../../../shared/components/input/input.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

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
  steps: number = 1;
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
      this.authService.forgetPassword(this.forgetPasswordForm.value).subscribe({
        next: (res) => {
          this.steps++;
        },
      });
    }
  }
  resetCode() {
    if (this.resetCodeForm.valid) {
      this.authService.resetCode(this.resetCodeForm.value).subscribe({
        next: (res) => {
          this.steps++;
          this.resetPasswordForm
            .get('email')
            ?.patchValue(this.forgetPasswordForm.get('email')?.value);
        },
      });
    }
  }
  resetPassword() {
    if (this.resetPasswordForm.valid) {
      this.authService.resetPassword(this.resetPasswordForm.value).subscribe({
        next: (res) => {},
      });
    }
  }
}
