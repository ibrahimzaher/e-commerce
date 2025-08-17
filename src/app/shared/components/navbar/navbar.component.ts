import { Component } from '@angular/core';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../../core/services/theme/theme.service';
import { LanguageService } from '../../../core/services/language/language.service';
import { CommonModule } from '@angular/common';
import { TranslateDirective, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CommonModule, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isDark!: boolean;
  showMenu: boolean = false;

  constructor(
    private flowbiteService: FlowbiteService,
    private themeService: ThemeService,
    private lang: LanguageService
  ) {
    this.isDark = this.themeService.isDark();
  }

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }
  toggleTheme() {
    this.themeService.toggleTheme();
    this.isDark = this.themeService.isDark();
  }

  changeLang(lang: string) {
    this.lang.changeLang(lang);
    this.showMenu = false;
  }
}
