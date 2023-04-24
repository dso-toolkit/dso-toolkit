import { Component, inject, Input, TemplateRef, Type, ViewChild } from "@angular/core";

import { StoryFnAngularReturnType } from "@storybook/angular/dist/ts3.9/client/preview/types";

import { DsoModalController } from "../../controllers/modal";

/** This component is used to demo the DsoModalController for angular */
@Component({
  selector: "modal-controller-demo",
  template: `<button class="dso-primary" type="button" (click)="open()">Toon modal</button>`,
})
export class ModalControllerDemo {
  private controller = inject(DsoModalController);

  @Input()
  body?: Type<unknown> | TemplateRef<unknown>;

  @Input()
  footer?: Type<unknown> | TemplateRef<unknown>;

  @Input()
  modalTitle?: string;

  @Input()
  startOpen = false;

  @Input()
  showCloseButton = false;

  open(): void {
    console.log("bodyRef", this.body, this.footer);

    if (this.body) {
      this.controller.open(
        { body: this.body, footer: this.footer, title: this.modalTitle },
        { options: { showCloseButton: this.showCloseButton } }
      );
    }
  }

  ngAfterViewInit() {
    if (this.startOpen) {
      this.open();
    }
  }
}

/** This component is used to demo passing a Type<unknown> as the body for the DsoModalController for angular */
@Component({
  selector: "modal-demo-content-component",
  template: `Dit is een voorbeeld van een Angular component wat wordt geinstantieerd als body`,
})
export class ModalDemoContentComponent {}
