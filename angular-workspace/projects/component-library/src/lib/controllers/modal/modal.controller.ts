import { Dialog } from "@angular/cdk/dialog";
import { ComponentPortal } from "@angular/cdk/portal";
import { inject, Injectable, Type } from "@angular/core";

import { ModalConfig, ModalContent, ModalController } from "dso-toolkit";

import { DsoModal } from "../../stencil-generated/components";
import { DsoModalContainer } from "./modal-container.component";
import { DsoModalRef } from "./modal.ref";

@Injectable()
export class DsoModalController implements ModalController<Type<DsoModal>> {
  private cdkDialog = inject(Dialog);

  open({ title, body, footer }: ModalContent<Type<unknown>>, config?: ModalConfig): DsoModalRef {
    const dialogRef = this.cdkDialog.open(DsoModalContainer, { data: config?.data });

    if (dialogRef.componentInstance) {
      if (title) {
        dialogRef.componentInstance.title = title;
      }

      if (config?.options) {
        dialogRef.componentInstance.options = config.options;
      }

      const bodyPortal = new ComponentPortal(body);
      dialogRef.componentInstance.bodyPortalRef = bodyPortal;

      if (footer) {
        const footerPortal = new ComponentPortal(footer);
        dialogRef.componentInstance.footerPortalRef = footerPortal;
      }
    }

    return new DsoModalRef(dialogRef);
  }
}
