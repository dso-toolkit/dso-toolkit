import { Dialog } from "@angular/cdk/dialog";
import { ComponentPortal, TemplatePortal } from "@angular/cdk/portal";
import { inject, Injectable, TemplateRef, Type } from "@angular/core";

import { ModalContent, ModalOptions } from "dso-toolkit";

import { DsoModalContainer } from "../../components/modal-container/modal-container.component";
import { DsoModalRef } from "./modal-ref";

export interface ModalConfig {
  data?: Record<string, unknown>;
  options?: ModalOptions;
}

@Injectable()
export class DsoModalController {
  private cdkDialog = inject(Dialog);

  open({ title, body, footer }: ModalContent<Type<unknown> | TemplateRef<unknown>>, config?: ModalConfig): DsoModalRef {
    const dialogRef = this.cdkDialog.open(DsoModalContainer, { data: config?.data });

    if (dialogRef.componentInstance) {
      if (title) {
        dialogRef.componentInstance.title = title;
      }

      if (config?.options) {
        dialogRef.componentInstance.options = config.options;
      }

      const bodyPortal =
        body instanceof TemplateRef
          ? new TemplatePortal(body, dialogRef.componentInstance.viewContainerRef)
          : new ComponentPortal(body);
      dialogRef.componentInstance.bodyPortalRef = bodyPortal;

      if (footer) {
        const footerPortal =
          footer instanceof TemplateRef
            ? new TemplatePortal(footer, dialogRef.componentInstance.viewContainerRef)
            : new ComponentPortal(footer);
        dialogRef.componentInstance.footerPortalRef = footerPortal;
      }
    }

    return new DsoModalRef(dialogRef);
  }
}
