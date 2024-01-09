import { FileUploadOptions } from './../../services/common/file-upload/file-upload.component';
import { Component, Inject, Output } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.css']
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> {
  constructor(dialogRef: MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectProductImageState | string,)
    {
      super(dialogRef)
    }

    @Output() options: Partial<FileUploadOptions> = {
      accept: ".png, .jpg, .jpeg, .gif",
      action: "upload",
      controller: "products"
    };
}

export enum SelectProductImageState {
  Close
}
