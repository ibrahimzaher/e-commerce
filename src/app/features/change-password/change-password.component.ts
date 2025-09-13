import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { InputComponent } from '../../shared/components/input/input.component';
import { AuthService } from './../../core/auth/services/auth/auth.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule, InputComponent, TranslatePipe],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  passwordRecahngeForm!: FormGroup;
  loading: WritableSignal<boolean> = signal<boolean>(false);
  ngOnInit(): void {
    this.inintForm();
  }
  inintForm() {
    this.passwordRecahngeForm = this.fb.group(
      {
        currentPassword: [null, [Validators.required]],
        password: [null, [Validators.required, Validators.pattern(/^.{6,}$/)]],
        rePassword: [null, [Validators.required]],
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
  submit() {
    if (this.passwordRecahngeForm.valid) {
      this.loading.set(true);
      this.authService
        .updatePassword(this.passwordRecahngeForm.value)
        .pipe(finalize(() => this.loading.set(false)))
        .subscribe({
          next: () => {
            this.router.navigate(['/home'], { replaceUrl: true });
          },
        });
    } else {
      this.passwordRecahngeForm.markAllAsTouched();
    }
  }
}
