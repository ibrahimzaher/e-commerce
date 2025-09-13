import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { CategoryWithSubs } from './models/category.interface';
import { CategoriesService } from './services/categories/categories.service';

@Component({
  selector: 'app-categories',
  imports: [TranslatePipe],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);
  groupedCategories: WritableSignal<CategoryWithSubs[]> = signal([]);
  constructor() {}
  ngOnInit(): void {
    this.getCategoriesWithSubCategories();
  }
  getCategoriesWithSubCategories() {
    this.categoriesService.getGroupedCategories().subscribe({
      next: (val) => {
        this.groupedCategories.set(val);
      },
    });
  }
}
