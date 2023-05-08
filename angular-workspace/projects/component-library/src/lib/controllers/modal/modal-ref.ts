import { DialogRef } from "@angular/cdk/dialog";

import { DsoModalContainer } from "../../components/modal-container/modal-container.component";
import { EventEmitter } from "@angular/core";
import { DsoModalCloseEvent } from "@dso-toolkit/core";

export class DsoModalRef {
  constructor(private dialogRef: DialogRef<unknown, DsoModalContainer>) {}

  close() {
    this.dialogRef.close();
  }

  onDsoClose(): EventEmitter<DsoModalCloseEvent> {
    if (!this.dialogRef.componentInstance) {
      throw Error("DsoModalRef dialogRef is not opened using a componentInstance");
    }

    return this.dialogRef.componentInstance.dsoClose;
  }
}
