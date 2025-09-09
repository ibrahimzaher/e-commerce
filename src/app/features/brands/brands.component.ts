import { Component, HostListener, inject, OnInit } from '@angular/core';
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
})
export class BrandsComponent implements OnInit {
  private readonly brandsService = inject(BrandsService);

  brands: Brand[] = [];
  searchControl = new FormControl('');

  page = 1;
  isLoading = false;

  ngOnInit(): void {
    this.loadBrands();
  }

  loadBrands() {
    if (this.isLoading) return;
    this.isLoading = true;

    this.brandsService.getAllBrands(this.page).subscribe({
      next: (res) => {
        this.brands = [...this.brands, ...res.data];
        if (res.metadata.numberOfPages == this.page) {
          return;
        }
        this.page++;
        this.isLoading = false;
      },
      error: () => (this.isLoading = false),
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
