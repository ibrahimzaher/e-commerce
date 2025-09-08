import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { ApiResponse, CategoryWithSubs, Subcategory } from '../../models/category.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly httpClient = inject(HttpClient);
  getAllCategories(): Observable<ApiResponse<Category>> {
    return this.httpClient.get<ApiResponse<Category>>(environment.baseUrl + `categories`);
  }
  getAllSubCategories(pageNumber: number = 1): Observable<ApiResponse<Subcategory>> {
    return this.httpClient.get<ApiResponse<Subcategory>>(environment.baseUrl + `subcategories`, {
      params: {
        page: pageNumber,
      },
    });
  }

  getGroupedCategories(): Observable<CategoryWithSubs[]> {
    return this.getAllCategories().pipe(
      switchMap((categries) =>
        this.getAllSubCategories().pipe(
          map((subCategories) => {
            const cats = categries.data;
            const subs = subCategories.data;
            return cats.map((cat) => {
              const children = subs.filter((sub) => sub.category === cat._id);
              return { ...cat, subcategories: children };
            });
          })
        )
      )
    );
  }
}
