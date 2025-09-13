import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { initFlowbite } from 'flowbite';
import { AuthService } from '../../../../auth/services/auth/auth.service';
import { FlowbiteService } from '../../../../services/flowbite/flowbite.service';
import { LangService } from '../../../../services/lang/lang.service';
import { ThemeService } from '../../../../services/theme/theme.service';

@Component({
  selector: 'app-navabr-auth',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './navabr-auth.component.html',
  styleUrl: './navabr-auth.component.css',
})
export class NavabrAuthComponent implements OnInit {
  constructor(private flowbiteService: FlowbiteService) {}
  private readonly themeService = inject(ThemeService);
  private readonly langService = inject(LangService);
  private readonly authService = inject(AuthService);
  lang = this.langService.lang;
  isDark = this.themeService.isDark;
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
