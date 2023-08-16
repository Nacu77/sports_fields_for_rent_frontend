import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.css'],
})
export class CustomSelectComponent {
  @Input() model: any;
  @Input() field: string;
  @Input() options: Map<string, string>;
  @Input() errorsMap: Map<string, string>;

  @Output() modelChange = new EventEmitter<any>();
}
