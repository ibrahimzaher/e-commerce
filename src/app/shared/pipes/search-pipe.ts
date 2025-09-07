import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../core/models/product.interface';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(products: Product[], searchTitle: string): Product[] {
    searchTitle = searchTitle.toLowerCase();

    return products.filter((prd) => prd.title.toLowerCase().includes(searchTitle));
  }
}
