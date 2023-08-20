import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-modal',
  templateUrl: './custom-modal.component.html',
  styleUrls: ['./custom-modal.component.css'],
})
export class CustomModalComponent {
  @Input() title: string;
  @Input() text: string;
  @Input() backdropId: string;
  @Output() yesClicked = new EventEmitter<void>();

  onYesClicked(): void {
    this.yesClicked.emit();
  }
}
