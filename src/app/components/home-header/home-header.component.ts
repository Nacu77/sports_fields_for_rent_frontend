import { Component } from '@angular/core';
import { EventType, Router } from '@angular/router';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.css'],
})
export class HomeHeaderComponent {
  url: string;

  constructor(private router: Router) {
    router.events.subscribe((event) => {
      if (event.type === EventType.NavigationEnd) {
        this.url = event.url;
      }
    });
  }

  getHeaderDetails(): HeaderDetails | null {
    switch (this.url) {
      case '/':
      case '/home':
        return {
          backgroundImage: '../../../../assets/images/home_header_image.jpg',
          title: 'All for sport',
          description: '"You win some, you lose some, and some get rained out, but you gotta suit up for them all" - J. Askenberg',
        };

      case '/sport-fields':
        return {
          backgroundImage: '../../../../assets/images/sport_fields_image.jpg',
          title: 'Find something suited for you',
          description: 'Search between different sports and different fields. If something catches your eye, then check it out and rent it',
        };
      default:
        return null;
    }
  }
}

interface HeaderDetails {
  backgroundImage: string;
  title: string;
  description: string;
}
