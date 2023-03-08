import { Component } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-confirm-dlg',
  templateUrl: './confirm-dlg.component.html',
  styleUrls: ['./confirm-dlg.component.less']
})
export class ConfirmDlgComponent {

  constructor(
    private dialogRef: MatDialogRef<ConfirmDlgComponent>,
  ) {
  }

  confirm() {
    this.dialogRef.close('confirmed');
  }
}
