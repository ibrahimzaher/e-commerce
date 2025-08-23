import { TranslateService } from '@ngx-translate/core';
import { Component, inject, OnDestroy } from '@angular/core';
import { OwlOptions, CarouselModule } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-slider',
  imports: [CarouselModule],
  templateUrl: './main-slider.component.html',
  styleUrls: ['./main-slider.component.css'],
})
export class MainSliderComponent implements OnDestroy {
  private readonly translateService = inject(TranslateService);
  lang!: string;
  subscription!: Subscription;
  customOptions!: OwlOptions;

  constructor() {
    this.lang = this.translateService.getCurrentLang() || 'en';
    this.changeOption(this.lang);

    // subscribe to language changes
    this.subscription = this.translateService.onLangChange.subscribe({
      next: (res) => this.changeOption(res.lang),
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  changeOption(lang: string) {
    const isArabic = lang === 'ar';
    this.customOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: false,
      dots: true,
      navSpeed: 700,
      autoplay: true,

      autoplayHoverPause: true,
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
  }
}
