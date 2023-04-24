export class DsoModalRef {
  constructor(private modalElement: HTMLElement) {
    if (!modalElement) {
      throw new Error("unable to add event listener. try opening the modal first");
    }
  }

  close() {
    document.body.removeChild(this.modalElement);
  }

  addEventListener(eventName: "dsoClose", fn: EventListenerOrEventListenerObject) {
    this.modalElement.addEventListener(eventName, fn);
  }

  removeEventListener(eventName: "dsoClose", fn: EventListenerOrEventListenerObject) {
    this.modalElement.removeEventListener(eventName, fn);
  }
}
