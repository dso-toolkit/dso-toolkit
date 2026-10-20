export function getEIdFromNode(node: Node): string | undefined {
  return (node instanceof Element && node.getAttribute("eId")) || undefined;
}
