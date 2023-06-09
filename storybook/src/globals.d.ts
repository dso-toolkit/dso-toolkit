interface ParentNode extends Node {
  /**
   * Replace all children of node with nodes, while replacing strings in nodes with equivalent Text nodes.
   *
   * Throws a "HierarchyRequestError" DOMException if the constraints of the node tree are violated.
   *
   * Source: https://github.com/microsoft/TypeScript/blob/main/lib/lib.dom.d.ts#L10953
   * Can be removed once StencilJS updates to TypeScript 4.4.3
   */
  replaceChildren(...nodes: (Node | string)[]): void;
}

declare module "*.md" {
  const content: string;
  export default content;
}
