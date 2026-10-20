export function getEIdFromNode(node: Node, ignore?: boolean): string | undefined {
  if (ignore) {
    return undefined;
  }

  return (node instanceof Element && node.getAttribute("eId")) || undefined;
}
