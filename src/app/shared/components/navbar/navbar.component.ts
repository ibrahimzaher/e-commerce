import { AuthService } from './../../../core/auth/services/auth/auth.service';
import { AsyncPipe } from '@angular/common';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { initFlowbite } from 'flowbite';
import { Observable } from 'rxjs';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';
import { LangService } from '../../../core/services/lang/lang.service';
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
  private readonly authService = inject(AuthService);
  @ViewChild('langBox') langBox!: ElementRef<HTMLDivElement>;
  $isDark: Observable<boolean> = this.themeService.observable();
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
