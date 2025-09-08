import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(products: any[] | null | undefined, searchTitle: string | null | undefined): any[] {
    if (!products) return [];
    if (!searchTitle) return products;

    searchTitle = searchTitle.toLowerCase();

    return products.filter(
      (prd) =>
        prd?.title?.toLowerCase().includes(searchTitle) ||
        prd?.name?.toLowerCase().includes(searchTitle)
    );
  }
}
