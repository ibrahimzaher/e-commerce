import { AuthService } from './../services/auth/auth.service';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../../shared/components/input/input.component';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  loginForm!: FormGroup;
  isLoading: boolean = false;

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
      this.isLoading = true;
      console.log(this.loginForm.value);
      this.authService
        .logIn(this.loginForm.value)
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe({
          next: (res) => {
            this.authService.setToken(res.token);
            this.authService.decodeToken();
            this.router.navigate(['/home']);
          },
        });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
