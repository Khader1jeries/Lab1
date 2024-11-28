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
  team = [
    { name: 'Student 1', id: '323016303', photo: 'assets/student1.jpg' },
    { name: 'Student 2', id: '000000000', photo: 'assets/s2.png' },
  ];

  darkTheme = false;

  toggleTheme() {
    this.darkTheme = !this.darkTheme;
    document.body.style.backgroundColor = this.darkTheme ? '#333' : '#fff';
    document.body.style.color = this.darkTheme ? '#fff' : '#000';
  }
}
