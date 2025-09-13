import {
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
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
export class PopularCategoriesComponent implements OnInit, OnDestroy {
  private readonly translateService = inject(TranslateService);
  private readonly categoriesService = inject(CategoriesService);

  categories: WritableSignal<Category[]> = signal([]);
  lang: WritableSignal<string> = signal(this.translateService.getCurrentLang() || 'en');

  categoryOption = computed<OwlOptions>(() => {
    const isArabic = this.lang() === 'ar';
    return {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: false,
      dots: false,
      navSpeed: 700,
      autoplay: true,
      margin: 20,
      responsive: {
        0: { items: 1 },
        400: { items: 2 },
        740: { items: 3 },
        940: { items: 6 },
      },
      autoplayTimeout: 3000,
      lazyLoad: true,
      animateIn: 'fadeIn',
      animateOut: 'fadeOut',
      navText: ['', ''],
      rtl: isArabic,
      nav: true,
    };
  });

  private subscription!: Subscription;

  constructor() {
    this.subscription = this.translateService.onLangChange.subscribe({
      next: (res) => this.lang.set(res.lang),
    });
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => this.categories.set(res),
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
