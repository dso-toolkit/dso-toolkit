import { ComponentPortal, TemplatePortal } from "@angular/cdk/portal";
import { Component, EventEmitter, Input, Output, ViewContainerRef, inject } from "@angular/core";
import { DsoModalCloseEvent } from "@dso-toolkit/core";

import { ModalOptions } from "../../models/modal.models";

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
  viewContainerRef = inject(ViewContainerRef);

  @Input()
  title?: string;

  @Input()
  options?: ModalOptions;

  @Input()
  bodyPortalRef?: ComponentPortal<unknown> | TemplatePortal<unknown>;

  @Input()
  footerPortalRef?: ComponentPortal<unknown> | TemplatePortal<unknown>;

  @Output()
  dsoClose = new EventEmitter<DsoModalCloseEvent>();
}
