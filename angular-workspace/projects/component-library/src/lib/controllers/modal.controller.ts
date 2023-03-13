import { DOCUMENT } from "@angular/common";
import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EnvironmentInjector,
  inject,
  Injectable,
  Type,
} from "@angular/core";

import { DsoModalController, ModalContent, ModalContentComponent, ModalOptions } from "dso-toolkit";

import { DsoModal } from "../stencil-generated/components";

export class AngularModalContentComponent implements ModalContentComponent<ComponentRef<DsoModal>> {
  private appRef: ApplicationRef;

  private document: Document;

  component: ComponentRef<DsoModal>;

  constructor(component: ComponentRef<DsoModal>, appRef: ApplicationRef, document: Document) {
    this.component = component;
    this.appRef = appRef;
    this.document = document;
  }

  open() {
    this.document.body.appendChild(this.component.location.nativeElement);

    // Register the newly created ref using the `ApplicationRef` instance
    // to include the component view into change detection cycles.
    this.appRef.attachView(this.component.hostView);
  }

  close() {
    this.document.body.removeChild(this.component.location.nativeElement);
  }

  addEventListener(eventName: string, fn: () => void): void {
    this.component.location.nativeElement.addEventListener(eventName, fn);
  }

  removeEventListener(eventName: string, fn: () => void): void {
    this.component.location.nativeElement.removeEventListener(eventName, fn);
  }
}

@Injectable({ providedIn: "root" })
export class ModalController implements DsoModalController<ComponentRef<DsoModal>, Type<unknown>> {
  private appRef: ApplicationRef = inject(ApplicationRef);

  private injector: EnvironmentInjector = inject(EnvironmentInjector);

  private document: Document = inject(DOCUMENT);

  createInstance(
    { title, body, footer }: ModalContent<Type<unknown>>,
    options?: ModalOptions
  ): AngularModalContentComponent {
    const bodyRef = createComponent(body, {
      environmentInjector: this.injector,
    });

    const bodyHtml = document.createElement("div");
    bodyHtml.setAttribute("slot", "body");
    bodyHtml.appendChild(bodyRef.location.nativeElement);

    const footerHtml = document.createElement("div");
    footerHtml.setAttribute("slot", "footer");

    if (footer) {
      const footerRef = createComponent(body, {
        environmentInjector: this.injector,
      });
      footerHtml.appendChild(footerRef.location.nativeElement);
    }

    const modalComponentRef = createComponent(DsoModal, {
      environmentInjector: this.injector,
      projectableNodes: [[bodyHtml], footer ? [footerHtml] : []],
    });

    if (title) {
      modalComponentRef.setInput("modalTitle", title);
    }

    if (options) {
      const { role, showCloseButton, initialFocus } = options;

      modalComponentRef.setInput("role", role);
      modalComponentRef.setInput("showCloseButton", showCloseButton);
      modalComponentRef.setInput("initialFocus", initialFocus);
    }

    return new AngularModalContentComponent(modalComponentRef, this.appRef, this.document);
  }
}
