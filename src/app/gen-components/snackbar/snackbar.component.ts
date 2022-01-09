import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  template: `
    <p [class]="conditionalFormatting(data.status)">
      {{ data.message }}
    </p>
  `,
  styles: [],
})
export class SnackbarComponent implements OnInit {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data) {}

  ngOnInit(): void {}

  conditionalFormatting(status) {
    let color = '';

    return (color =
      status == 1
        ? 'text-success do-not-show-on-print'
        : 'text-danger do-not-show-on-print');
  }
}
