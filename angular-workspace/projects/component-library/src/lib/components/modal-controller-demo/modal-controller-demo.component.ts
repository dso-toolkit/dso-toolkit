import { Component, EventEmitter, inject, Input, Output, TemplateRef, Type } from "@angular/core";

import { DsoModalController, DsoModalRef } from "../../controllers/modal";

/** This component is used to demo the DsoModalController for angular */
@Component({
  selector: "modal-controller-demo",
  template: ``,
})
export class ModalControllerDemo {
  private controller = inject(DsoModalController);

  private modalRef?: DsoModalRef;

  @Input()
  body?: Type<unknown> | TemplateRef<unknown>;

  @Input()
  footer?: Type<unknown> | TemplateRef<unknown>;

  @Input()
  modalTitle?: string;

  @Input()
  showCloseButton = false;

  @Output()
  dsoClose = new EventEmitter();

  open(): void {
    if (this.body) {
      this.modalRef = this.controller.open(
        { body: this.body, footer: this.footer, title: this.modalTitle },
        { options: { showCloseButton: this.showCloseButton } }
      );

      this.modalRef.onDsoClose().subscribe((e) => this.dsoClose.emit(e));

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any)["modalRef"] = { framework: "angular", ref: this.modalRef };
    }
  }

  ngAfterViewInit() {
    this.open();
  }
}

/** This component is used to demo passing a Type<unknown> as the body for the DsoModalController for angular */
@Component({
  selector: "modal-demo-content-component",
  template: `Dit is een voorbeeld van een Angular component wat wordt geinstantieerd als body`,
})
export class ModalDemoContentComponent {}
