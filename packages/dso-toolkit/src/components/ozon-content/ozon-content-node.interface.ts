import { JSX } from "@stencil/core";

import { OzonContentNodeContext } from "./ozon-content-node-context.interface";

export interface OzonContentNode<T = unknown> {
  name: string | string[];

  handles?: string[];

  identify?(node: Node): string | undefined;

  render(node: Node, context: OzonContentNodeContext<T>, ignoreMark?: boolean): JSX.Element;
}
