import { Component } from '@angular/core';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrl: './home-screen.component.css'
})
export class HomeScreenComponent {

  slides = [
    { image: '../../assets/img/img_nature_wide.jpg', caption: 'hi first slide label', description: 'Some representative placeholder content for the first slide.' },
    { image: '../../assets/img/img_lights_wide.jpg', caption: 'Second slide label', description: 'Some representative placeholder content for the second slide.' },
    { image: '../../assets/img/img_mountains_wide.jpg', caption: 'Third slide label', description: 'Some representative placeholder content for the third slide.' }
  ];

}
