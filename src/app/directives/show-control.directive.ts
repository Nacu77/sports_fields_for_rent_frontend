import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { shouldElementDisplay } from '../utility/auth-utilities';

@Directive({
  selector: '[showControl]',
})
export class ShowControlDirective implements OnInit {
  @Input('ownedBy') ownedBy: string | null;

  constructor(private elementRef: ElementRef, private userService: UserService) {}

  ngOnInit(): void {
    if (!shouldElementDisplay(this.userService, this.ownedBy)) {
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
