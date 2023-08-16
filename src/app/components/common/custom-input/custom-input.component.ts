import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.css'],
})
export class CustomInputComponent {
  @Input() model: any;
  @Input() field: string;
  @Input() type: string;
  @Input() label: string;
  @Input() errorsMap: Map<string, string>;

  @Output() modelChange = new EventEmitter<any>();
}
