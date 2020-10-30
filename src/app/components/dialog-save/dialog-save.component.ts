import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-save',
  templateUrl: './dialog-save.component.html',
  styleUrls: ['./dialog-save.component.scss']
})
export class DialogSaveComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogSaveComponent>,
  ) {
  }

  ngOnInit() {
  }

  closeDialog(save?) {
    this.dialogRef.close(save);
  }

}
