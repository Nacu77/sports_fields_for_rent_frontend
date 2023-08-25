import { Component } from '@angular/core';
import { EventType, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
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
          title: 'Sport for all',
          description: '"You win some, you lose some, and some get rained out, but you gotta suit up for them all" - J. Askenberg',
        };

      case '/sport-fields':
        return {
          backgroundImage: '../../../../assets/images/sport_fields_image.jpg',
          title: 'Find something suited for you',
          description: 'Search between different sports and different fields. If something catches your eye, then check it out and rent it',
        };

      case '/appointment-posts':
        return {
          backgroundImage: '../../../../assets/images/appointment_posts_image.jpg',
          title: 'Make new friends while doing sport',
          description:
            'If you want to do some sport but your friends are not available, then search here some appointments and apply to make new friends',
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
