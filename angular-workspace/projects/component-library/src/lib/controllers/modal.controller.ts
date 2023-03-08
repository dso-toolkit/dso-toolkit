import { DOCUMENT } from "@angular/common";
import { ApplicationRef, createComponent, EnvironmentInjector, inject, Injectable, Type } from "@angular/core";

import { DsoModalController, Modal, ModalContentComponent } from "dso-toolkit";

import { DsoModal } from "../stencil-generated/components";

export class AngularModalContentComponent implements ModalContentComponent<Type<DsoModal>> {
  // private appRef: ApplicationRef = inject(ApplicationRef);
  // private injector: EnvironmentInjector = inject(EnvironmentInjector);
  // private document: Document = inject(DOCUMENT);

  private appRef: ApplicationRef;

  private injector: EnvironmentInjector;

  private document: Document;

  component: Type<DsoModal>;

  constructor(component: Type<DsoModal>, appRef: ApplicationRef, injector: EnvironmentInjector, document: Document) {
    this.component = component;
    this.appRef = appRef;
    this.injector = injector;
    this.document = document;
  }

  open() {
    const modalComponentRef = createComponent(this.component, {
      environmentInjector: this.injector,
    });

    this.document.body.appendChild(modalComponentRef.location.nativeElement);

    // Register the newly created ref using the `ApplicationRef` instance
    // to include the component view into change detection cycles.
    this.appRef.attachView(modalComponentRef.hostView);
  }

  close() {
    this.document.body.lastChild?.remove();
    // this.document.removeChild(modalComponentRef.location.nativeElement);
  }
}

@Injectable({ providedIn: "root" })
export class ModalController implements DsoModalController<Type<DsoModal>, string> {
  private appRef: ApplicationRef = inject(ApplicationRef);

  private injector: EnvironmentInjector = inject(EnvironmentInjector);

  private document: Document = inject(DOCUMENT);

  getInstance(component: Type<DsoModal>): AngularModalContentComponent {
    return new AngularModalContentComponent(component, this.appRef, this.injector, this.document);
  }

  create({
    modalTitle,
    body,
    footer,
    role,
    showCloseButton,
    initialFocus,
    dsoClose,
  }: Modal<string>): AngularModalContentComponent {
    const bodyHtml = document.createElement("div");
    bodyHtml.setAttribute("slot", "body");
    bodyHtml.innerHTML = body;

    const footerHtml = document.createElement("div");
    footerHtml.setAttribute("slot", "footer");

    if (footer) {
      footerHtml.innerHTML = footer;
    }

    const modalComponentRef = createComponent(DsoModal, {
      environmentInjector: this.injector,
      projectableNodes: [[bodyHtml], footer ? [footerHtml] : []],
    });

    modalComponentRef.setInput("modalTitle", modalTitle);
    modalComponentRef.setInput("role", role);
    modalComponentRef.setInput("showCloseButton", showCloseButton);
    modalComponentRef.setInput("initialFocus", initialFocus);
    modalComponentRef.setInput("dsoClose", dsoClose);

    return new AngularModalContentComponent(
      modalComponentRef.location.nativeElement,
      this.appRef,
      this.injector,
      this.document
    );
  }
}
