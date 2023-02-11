import { createStore } from "@stencil/store";

interface AnnotationState {
  [key: string]: boolean;
}

export abstract class AnnotationService {
  private static _state: AnnotationState;

  static get state(): AnnotationState {
    if (!this._state) {
      AnnotationService.initializeStore();
    }

    return this._state;
  }

  static toggle(id: string): void {
    this._state[id] = !this._state[id];
  }

  private static initializeStore(): void {
    const { state } = createStore<AnnotationState>({});

    AnnotationService._state = state;
  }
}
