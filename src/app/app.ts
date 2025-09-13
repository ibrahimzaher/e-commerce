import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxLoadingBar } from '@ngx-loading-bar/core';
import * as AOS from 'aos';
import { NgxSpinnerComponent } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxLoadingBar, NgxSpinnerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init({
        duration: 500,
        once: false,
      });
    }
  }
}
