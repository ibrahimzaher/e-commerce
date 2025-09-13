import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, inject, computed, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { initFlowbite } from 'flowbite';
import { CartService } from '../../../../../features/cart/services/cart.service';
import { WishlistService } from '../../../../../features/wishlist/servuces/wishlist.service';
import { AuthService } from '../../../../auth/services/auth/auth.service';
import { FlowbiteService } from '../../../../services/flowbite/flowbite.service';
import { LangService } from '../../../../services/lang/lang.service';
import { ThemeService } from '../../../../services/theme/theme.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
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
  lang = this.langService.lang;
  count = computed(() => this.wishlistService.wishlistIds().length);
  countCart = this.cartService.totalItems;
  isDark = this.themeService.isDark;

  paltformId = inject(PLATFORM_ID);
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(() => {
      initFlowbite();
    });
    if (isPlatformBrowser(this.paltformId)) {
      this.cartService.getUserLoggedCart().subscribe(() => {});
      this.wishlistService.loadWishlist().subscribe(() => {});
    }
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
