import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, of, switchMap, throwError } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ApiResponse, CategoryWithSubs, Subcategory } from '../../models/category.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly httpClient = inject(HttpClient);
  getAllCategories(): Observable<Category[]> {
    return this.httpClient
      .get<ApiResponse<Category>>(environment.baseUrl + `categories`)
      .pipe(map((data) => data.data));
  }
  getAllSubCategories(pageNumber: number = 1): Observable<Subcategory[]> {
    return this.httpClient
      .get<ApiResponse<Subcategory>>(environment.baseUrl + `subcategories`, {
        params: {
          page: pageNumber,
        },
      })
      .pipe(map((data) => data.data));
  }

  getGroupedCategories(): Observable<CategoryWithSubs[]> {
    return forkJoin({
      categories: this.getAllCategories(),
      subcategories: this.getAllSubCategories(),
    }).pipe(
      map(({ categories, subcategories }) => {
        const subMap = subcategories.reduce((acc, sub) => {
          if (!acc[sub.category]) acc[sub.category] = [];
          acc[sub.category].push(sub);
          return acc;
        }, {} as Record<string, Subcategory[]>);

        return categories.map((cat) => ({
          ...cat,
          subcategories: subMap[cat._id] || [],
        }));
      })
    );
  }
}
