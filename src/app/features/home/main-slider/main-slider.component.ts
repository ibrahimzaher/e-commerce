import { Component, computed, inject, OnDestroy, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-slider',
  imports: [CarouselModule],
  templateUrl: './main-slider.component.html',
  styleUrl: './main-slider.component.css',
})
export class MainSliderComponent implements OnDestroy {
  private readonly translateService = inject(TranslateService);

  lang = signal(this.translateService.getCurrentLang() || 'en');

  private subscription!: Subscription;

  customOptions = computed<OwlOptions>(() => {
    const isArabic = this.lang() === 'ar';
    return {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: false,
      dots: true,
      navSpeed: 700,
      autoplay: true,
      autoplayTimeout: 3000,
      lazyLoad: true,
      animateIn: 'fadeIn',
      animateOut: 'fadeOut',
      navText: isArabic
        ? ['<i class="fa fa-chevron-right"></i>', '<i class="fa fa-chevron-left"></i>']
        : ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
      items: 1,
      rtl: isArabic,
      nav: true,
    };
  });

  constructor() {
    this.subscription = this.translateService.onLangChange.subscribe({
      next: (res) => this.lang.set(res.lang),
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
