export function getNodeName(node: Node): string {
  if (node instanceof Element) {
    return node.localName;
  }

  if (node.nodeName.includes(":")) {
    return node.nodeName.substring(node.nodeName.indexOf(":") + 1);
  }

  return node.nodeName;
}
