import { finalize, tap } from 'rxjs';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { InputComponent } from '../../shared/components/input/input.component';
import { SearchPipe } from '../../shared/pipes/search-pipe';
import { Brand } from './models/brands-response.interface';
import { BrandsService } from './services/brands.service';

@Component({
  selector: 'app-brands',
  imports: [SearchPipe, InputComponent, ReactiveFormsModule, TranslatePipe],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandsComponent implements OnInit {
  private readonly brandsService = inject(BrandsService);

  brands = signal<Brand[]>([]);
  searchControl = new FormControl('');
  page = signal(1);
  isLoading = signal(false);
  hasMorePages = signal(true);

  ngOnInit(): void {
    this.loadBrands();
  }

  loadBrands() {
    if (this.isLoading() || !this.hasMorePages()) return;

    this.isLoading.set(true);

    this.brandsService
      .getAllBrands(this.page())
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (res) => {
          this.brands.update((prev) => [...prev, ...res.data]);

          // Check if we reached the last page
          if (res.metadata.numberOfPages === this.page()) {
            this.hasMorePages.set(false); // No more pages
          } else {
            this.page.update((p) => p + 1);
          }
        },
      });
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const threshold = 300;
    const position = window.innerHeight + window.scrollY;
    const height = document.documentElement.scrollHeight;

    if (position >= height - threshold) {
      this.loadBrands();
    }
  }
}
