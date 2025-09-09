import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-notfound',
  imports: [TranslatePipe],
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.css',
})
export class NotfoundComponent {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/home'], { replaceUrl: true });
  }
}
