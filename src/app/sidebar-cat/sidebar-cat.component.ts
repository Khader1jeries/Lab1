// side-cat.component.ts
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar-cat',
  templateUrl: './sidebar-cat.component.html',
  styleUrls: ['./sidebar-cat.component.css'],
  standalone: true  // This declares it as a standalone component
})
export class SideCatComponent {
  @Output() categorySelected = new EventEmitter<string>();

  filter(category: string) {
    this.categorySelected.emit(category);
  }
}
