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

  getBackgroundImage(): string {
    return '../../../../assets/images/header_image.jpg';
  }

  renderComponent(): boolean {
    if (this.url === '/home' || this.url === '/sport-fields') {
      return true;
    }

    return false;
  }
}
