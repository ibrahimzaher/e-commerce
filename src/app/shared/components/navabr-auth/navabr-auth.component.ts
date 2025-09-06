import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../../core/auth/services/auth/auth.service';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';
import { LangService } from '../../../core/services/lang/lang.service';
import { ThemeService } from '../../../core/services/theme/theme.service';
import { WishlistService } from '../../../features/wishlist/servuces/wishlist.service';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-navabr-auth',
  imports: [RouterLink, AsyncPipe, TranslatePipe],
  templateUrl: './navabr-auth.component.html',
  styleUrl: './navabr-auth.component.css',
})
export class NavabrAuthComponent implements OnInit {
  constructor(private flowbiteService: FlowbiteService) {}
  private readonly themeService = inject(ThemeService);
  private readonly langService = inject(LangService);
  private readonly PLATFORM_ID = inject(PLATFORM_ID);
  private readonly authService = inject(AuthService);
  lang$: Observable<string> = this.langService.lang.asObservable();
  count: number | null = null;
  isDark$: Observable<boolean> = this.themeService.observable();
  subscription!: Subscription;
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
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
