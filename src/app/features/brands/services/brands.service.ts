import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { BrandsResponse } from '../models/brands-response.interface';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  private readonly httpClient = inject(HttpClient);
  getAllBrands(pageNumber: number = 1): Observable<BrandsResponse> {
    return this.httpClient.get<BrandsResponse>(environment.baseUrl + `brands`, {
      params: {
        page: pageNumber,
      },
    });
  }
}
