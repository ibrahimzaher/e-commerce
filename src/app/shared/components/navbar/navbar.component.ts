import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { initFlowbite } from 'flowbite';
import { Observable, Subscription } from 'rxjs';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';
import { LangService } from '../../../core/services/lang/lang.service';
import { CartService } from '../../../features/cart/services/cart.service';
import { WishlistService } from '../../../features/wishlist/servuces/wishlist.service';
import { AuthService } from './../../../core/auth/services/auth/auth.service';
import { ThemeService } from './../../../core/services/theme/theme.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, AsyncPipe, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  constructor(private flowbiteService: FlowbiteService) {}
  private readonly themeService = inject(ThemeService);
  private readonly langService = inject(LangService);
  private readonly wishlistService = inject(WishlistService);
  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);
  lang$: Observable<string> = this.langService.lang.asObservable();
  count: number | null = null;
  isDark$: Observable<boolean> = this.themeService.observable();
  subscription!: Subscription;
  countCart: number | undefined = undefined;
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
    this.wishlistService.wishlistIds$.subscribe({
      next: (res) => (this.count = res.length),
    });
    this.cartService.cart$.subscribe({
      next: (res) => (this.countCart = res?.numOfCartItems),
    });
  }

  setDarkMode() {
    this.themeService.setDarkMode();
  }
  setLightMode() {
    this.themeService.setLightMode();
  }

  changeLang(language: string) {
    this.langService.changeLang(language);
  }
  signOut() {
    this.authService.signOut();
  }
}
