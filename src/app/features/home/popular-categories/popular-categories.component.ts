import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Component, inject, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { finalize, Observable, Subscription } from 'rxjs';
import { CategoriesService } from '../../../core/services/categories/categories.service';

@Component({
  selector: 'app-popular-categories',
  imports: [CarouselModule],
  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.css',
})
export class PopularCategoriesComponent implements OnDestroy {
  private readonly translateService = inject(TranslateService);
  private readonly categoriesService = inject(CategoriesService);
  categories: Category[] = [];
  isloading: boolean = false;
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
    this.isloading = true;
    this.categoriesService
      .getCategories()
      .pipe(finalize(() => (this.isloading = false)))
      .subscribe({
        next: (res) => {
          this.categories = res.data;
        },
        error: (err) => {
          console.log(err);
        },
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
      autoplayHoverPause: true,
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
