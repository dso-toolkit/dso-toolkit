import { DialogRef } from "@angular/cdk/dialog";

import { ModalRef } from "dso-toolkit";

import { DsoModalContainer } from "./modal-container.component";

export class DsoModalRef implements ModalRef {
  constructor(private dialogRef: DialogRef<unknown, DsoModalContainer>) {}

  close() {
    this.dialogRef?.close();
  }

  onDsoClose(fn: (e: Event | CustomEvent) => void): void {
    this.dialogRef.componentInstance?.dsoClose.subscribe(fn);
  }

  offDsoClose(): void {
    this.dialogRef.componentInstance?.dsoClose.unsubscribe();
  }
}
