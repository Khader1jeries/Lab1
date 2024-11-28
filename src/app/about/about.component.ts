import { Component, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  team = [
    { name: 'Student 1', id: '323016303', photo: 'assets/s1.jpg' },
    { name: 'Student 2', id: '000000000', photo: 'assets/s2.png' },
  ];

  darkTheme = false;

  constructor(private renderer: Renderer2) {}

  toggleTheme() {
    this.darkTheme = !this.darkTheme;

    if (this.darkTheme) {
      this.renderer.addClass(document.body, 'dark-mode');
    } else {
      this.renderer.removeClass(document.body, 'dark-mode');
    }
  }
}
