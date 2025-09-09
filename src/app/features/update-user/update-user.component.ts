import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/auth/services/auth/auth.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputComponent } from '../../shared/components/input/input.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-update-user',
  imports: [ReactiveFormsModule, InputComponent, TranslatePipe],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css',
})
export class UpdateUserComponent {
  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  nameUpdateForm!: FormGroup;
  emailUpdateForm!: FormGroup;
  phoneUpdateForm!: FormGroup;
  userUpdateForm!: FormGroup;
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
      this.authService.updateLoggedUserData(fromGroup.value).subscribe({
        next: (res) => {},
      });
    } else {
      fromGroup.markAllAsTouched();
    }
  }
}
