import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';

@Directive({
  selector: '[showControl]',
})
export class ShowControlDirective implements OnInit {
  @Input('ownedBy') ownedBy: string | null;

  constructor(private elementRef: ElementRef, private userService: UserService) {}

  ngOnInit(): void {
    const username = this.userService.getUsername();
    if (!this.userService.isLoggedIn() || this.ownedBy !== username || (this.ownedBy === null && username === null)) {
      this.setDisplayNone(this.elementRef.nativeElement);
    }
  }

  setDisplayNone(element: any): void {
    element.style.display = 'none';
    if (element.children) {
      for (let child of element.children) {
        this.setDisplayNone(child);
      }
    }
  }
}
