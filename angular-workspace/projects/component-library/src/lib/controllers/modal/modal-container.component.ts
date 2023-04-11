import { ComponentPortal } from "@angular/cdk/portal";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { DsoModalCloseEvent } from "@dso-toolkit/core";

import { ModalOptions } from "dso-toolkit";

@Component({
  selector: "dso-modal-container",
  template: `
    <dso-modal
      [modalTitle]="title"
      [role]="options?.role"
      [showCloseButton]="options?.showCloseButton"
      [initialFocus]="options?.initialFocus"
      (dsoClose)="dsoClose.emit($event.detail)"
    >
      <div *ngIf="bodyPortalRef" slot="body"><ng-template [cdkPortalOutlet]="bodyPortalRef"></ng-template></div>
      <div *ngIf="footerPortalRef" slot="footer"><ng-template [cdkPortalOutlet]="footerPortalRef"></ng-template></div>
    </dso-modal>
  `,
})
export class DsoModalContainer {
  @Input()
  title?: string;

  @Input()
  options?: ModalOptions;

  @Input()
  bodyPortalRef?: ComponentPortal<unknown>;

  @Input()
  footerPortalRef?: ComponentPortal<unknown>;

  @Output()
  dsoClose = new EventEmitter<DsoModalCloseEvent>();
}
