// combined-catalog.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideCatComponent } from '../sidebar-cat/sidebar-cat.component';
import { CatalogComponent } from '../catalog/catalog.component';

@Component({
  selector: 'app-combined-catalog',
  templateUrl: './combined-catalog.component.html',
  styleUrls: ['./combined-catalog.component.css'],
  standalone: true,
  imports: [CommonModule, SideCatComponent, CatalogComponent]  // Import the child components
})
export class CombinedCatalogComponent {
  selectedCategory: string = 'all';

  onCategorySelected(category: string) {
    this.selectedCategory = category;
  }
}
