import { AuthService } from './../../../core/auth/services/auth/auth.service';
import { AsyncPipe, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, inject, OnInit, ViewChild, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { initFlowbite } from 'flowbite';
import { Observable, Subscription } from 'rxjs';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';
import { LangService } from '../../../core/services/lang/lang.service';
import { ThemeService } from './../../../core/services/theme/theme.service';
import { WishlistService } from '../../../features/wishlist/servuces/wishlist.service';

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
  private readonly PLATFORM_ID = inject(PLATFORM_ID);
  private readonly authService = inject(AuthService);
  @ViewChild('langBox') langBox!: ElementRef<HTMLDivElement>;
  count: number | null = null;
  $isDark: Observable<boolean> = this.themeService.observable();
  subscription!: Subscription;
  ngOnInit(): void {
    if (isPlatformBrowser(this.PLATFORM_ID)) {
      this.flowbiteService.loadFlowbite((flowbite) => {
        initFlowbite();
      });
    }
    this.wishlistService.wishlistIds$.subscribe({
      next: (res) => (this.count = res.length),
    });
  }

  setDarkMode() {
    this.themeService.setDarkMode();
  }
  setLightMode() {
    this.themeService.setLightMode();
  }
  toggleLangBox() {
    this.langBox.nativeElement.classList.toggle('hidden');
    this.langBox.nativeElement.classList.toggle('flex');
  }
  changeLang(language: string) {
    this.toggleLangBox();
    this.langService.changeLang(language);
  }
  signOut() {
    this.authService.signOut();
  }
}
