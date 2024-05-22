import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-animations-example-dialog',
  templateUrl: './dialog-animations-example-dialog.component.html',
  styleUrl: './dialog-animations-example-dialog.component.css'
})
export class DialogAnimationsExampleDialogComponent {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialogComponent>) {}

}
