import { Component, inject, OnDestroy } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../categories/services/categories/categories.service';

@Component({
  selector: 'app-popular-categories',
  imports: [CarouselModule, TranslateModule],
  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.css',
})
export class PopularCategoriesComponent implements OnDestroy {
  private readonly translateService = inject(TranslateService);
  private readonly categoriesService = inject(CategoriesService);
  categories: Category[] = [];
  lang!: string;
  subscription!: Subscription;
  categoryOption!: OwlOptions;

  constructor() {
    this.lang = this.translateService.getCurrentLang() || 'en';
    this.changeOption(this.lang);
    this.getCategories();
    this.subscription = this.translateService.onLangChange.subscribe({
      next: (res) => this.changeOption(res.lang),
    });
  }
  getCategories(): void {
    this.categoriesService
      .getAllCategories()

      .subscribe({
        next: (res) => {
          this.categories = res.data;
        },
        error: (err) => {},
      });
  }
  changeOption(lang: string) {
    const isArabic = lang === 'ar';
    this.categoryOption = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: false,
      dots: false,
      navSpeed: 700,
      autoplay: true,
      margin: 20,
      items: 1,
      responsive: {
        0: {
          items: 1,
        },
        400: {
          items: 2,
        },
        740: {
          items: 3,
        },
        940: {
          items: 6,
        },
      },
      autoplayTimeout: 3000,
      lazyLoad: true,
      animateIn: 'fadeIn',
      animateOut: 'fadeOut',
      navText: ['', ''],
      rtl: isArabic,
      nav: true,
    };
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
