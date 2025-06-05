export interface WaitForComponent<T extends HTMLElement> {
  is(element: HTMLElement): element is T;
  wait(element: T): void;
}
