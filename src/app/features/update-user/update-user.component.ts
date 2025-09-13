import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../core/auth/services/auth/auth.service';
import { InputComponent } from '../../shared/components/input/input.component';
import { sign } from 'crypto';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-user',
  imports: [ReactiveFormsModule, InputComponent, TranslatePipe],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css',
})
export class UpdateUserComponent {
  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  nameUpdateForm!: FormGroup;
  emailUpdateForm!: FormGroup;
  phoneUpdateForm!: FormGroup;
  userUpdateForm!: FormGroup;
  loading: WritableSignal<boolean> = signal<boolean>(false);
  ngOnInit(): void {
    this.inintForm();
  }
  inintForm() {
    this.nameUpdateForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    });
    this.phoneUpdateForm = this.fb.group({
      phone: [null, [Validators.required, Validators.pattern(/^(?:\+20|0)?(10|11|12|15)\d{8}$/)]],
    });
    this.emailUpdateForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
    });
    this.userUpdateForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required, Validators.pattern(/^(?:\+20|0)?(10|11|12|15)\d{8}$/)]],
    });
  }

  update(fromGroup: FormGroup<any>) {
    if (fromGroup.valid) {
      this.loading.set(true);
      this.authService
        .updateLoggedUserData(fromGroup.value)
        .pipe(finalize(() => this.loading.set(false)))
        .subscribe({
          next: () => this.router.navigate(['/home'], { replaceUrl: true }),
        });
    } else {
      fromGroup.markAllAsTouched();
    }
  }
}
