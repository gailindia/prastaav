import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css']
})
export class AlertDialogComponent {
  @Input() message: string = '';
  @Output() close = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  closeDialog() {
    this.close.emit();
  }
  cancelDialog() {
    this.cancel.emit();
  }
}
