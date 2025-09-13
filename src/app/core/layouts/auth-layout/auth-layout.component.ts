import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavabrAuthComponent } from './components/navabr-auth/navabr-auth.component';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, NavabrAuthComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css',
})
export class AuthLayoutComponent {}
