import { Component } from '@angular/core';
import { MainSliderComponent } from './main-slider/main-slider.component';
import { PopularCategoriesComponent } from './popular-categories/popular-categories.component';
import { PopularProductsComponent } from './popular-products/popular-products.component';

@Component({
  selector: 'app-home',
  imports: [MainSliderComponent, PopularCategoriesComponent, PopularProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
