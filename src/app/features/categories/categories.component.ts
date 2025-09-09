import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from './services/categories/categories.service';
import { CategoryWithSubs } from './models/category.interface';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-categories',
  imports: [TranslatePipe],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);
  groupedCategories: CategoryWithSubs[] = [];

  ngOnInit() {
    this.categoriesService.getGroupedCategories().subscribe((res) => {
      this.groupedCategories = res;
    });
  }
}
