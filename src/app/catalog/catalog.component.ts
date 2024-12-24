// catalog.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule for common directives
import { ProductInterFace } from '../module/product.model';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
  standalone: true,
  imports: [CommonModule]  // Import CommonModule here
})
export class CatalogComponent implements OnInit {
  @Input() category: string = 'all';
  products: ProductInterFace[] = [
    { name: 'Pizza 1', category: 'pizza' },
    { name: 'Pizza 2', category: 'pizza' },
    { name: 'Baget 1', category: 'baget' },
    { name: 'Other 1', category: 'others' },
    // add more products as needed
  ];
  filteredProducts: ProductInterFace[] = [];

  ngOnInit() {
    this.filterProducts();
  }

  ngOnChanges() {
    this.filterProducts();
  }

  filterProducts() {
    if (this.category === 'all') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(p => p.category === this.category);
    }
  }
}
