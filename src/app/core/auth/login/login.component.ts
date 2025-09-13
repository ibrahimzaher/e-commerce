import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { finalize } from 'rxjs';
import { InputComponent } from '../../../shared/components/input/input.component';
import { AuthService } from './../services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputComponent, RouterLink, TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  loginForm!: FormGroup;
  isLoading: WritableSignal<boolean> = signal(false);
  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^.{6,}$/)]],
    });
  }
  login() {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.authService
        .logIn(this.loginForm.value)
        .pipe(finalize(() => this.isLoading.set(false)))
        .subscribe({
          next: () => {
            this.router.navigate(['/home'], { replaceUrl: true });
          },
        });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
