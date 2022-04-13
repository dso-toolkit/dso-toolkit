export interface OzonContentNodeContext<T = unknown> {
  path: Node[];
  mapNodeToJsx(node: Node | Node[] | NodeList): JSX.Element;
  emitAnchorClick(event: any): void;
  state?: T;
  setState?(state: T): void;
}
