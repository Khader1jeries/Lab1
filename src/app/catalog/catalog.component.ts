import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductInterFace } from '../model/product.model';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
  standalone: true,
  imports: [CommonModule] 
})
export class CatalogComponent implements OnInit {
  @Input() category: string = 'all';
  products: ProductInterFace[] = [
    { name: 'anotherBurger', category: 'burger', imageUrl: 'assets/Catalog/anotherBurger.jpg' },
    { name: 'ArabicSalad', category: 'others', imageUrl: 'assets/Catalog/ArabicSalad.jpg' },
    { name: 'baget1', category: 'others', imageUrl: 'assets/Catalog/baget1.jpg' },
    { name: 'Chicken Burger', category: 'burger', imageUrl: 'assets/Catalog/Chicken Burger.jpg' },
    { name: 'classic burger', category: 'burger', imageUrl: 'assets/Catalog/classic burger.jpg' },
    { name: 'ClassicPizza', category: 'pizza', imageUrl: 'assets/Catalog/ClassicPizza.jpg' },
    { name: 'Diet1', category: 'others', imageUrl: 'assets/Catalog/Diet1.jpg' },
    { name: 'diet2', category: 'others', imageUrl: 'assets/Catalog/diet2.jpg' },
    { name: 'Diet3', category: 'others', imageUrl: 'assets/Catalog/Diet3.jpg' },
    { name: 'fatosh', category: 'others', imageUrl: 'assets/Catalog/fatosh.jpg' },
    { name: 'HomePizza', category: 'pizza', imageUrl: 'assets/Catalog/HomePizza.jpg' },
    { name: 'italicpizza', category: 'pizza', imageUrl: 'assets/Catalog/italicpizza.jpg' },
    { name: 'Napilion Pizza', category: 'pizza', imageUrl: 'assets/Catalog/Napilion Pizza.jpg' },
    { name: 'shawrma', category: 'others', imageUrl: 'assets/Catalog/shawrma.jpg' },
    { name: 'tabola', category: 'others', imageUrl: 'assets/Catalog/tabola.jpg' },
    { name: 'Taco', category: 'others', imageUrl: 'assets/Catalog/Taco.jpg' },
    { name: 'tortia', category: 'others', imageUrl: 'assets/Catalog/tortia.jpg' },
    { name: 'Yet Another Burger', category: 'burger', imageUrl: 'assets/Catalog/Yet Another Burger.jpg' },
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