import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  backgroundColor = 'white';
  textColor = 'black';

  toggleTheme() {
    if (this.backgroundColor === 'white') {
      this.backgroundColor = 'black';
      this.textColor = 'white';
    } else {
      this.backgroundColor = 'white';
      this.textColor = 'black';
    }
  }

  team = [
    { name: 'Student 1', id: '323016303', photo: 'assets/s1.jpg' },
    { name: 'Student 2', id: '000000000', photo: 'assets/s2.png' },
  ];
}
