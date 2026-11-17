/**
 * STOP elements like `Titel` and `Bijschrift` are mixed content: an element without text can still have content (e.g. an `InlineTekstAfbeelding`).
 */
export function hasContent(node: Node | undefined): node is Node {
  return (
    !!node &&
    Array.from(node.childNodes).some(
      (child) =>
        child.nodeType === Node.ELEMENT_NODE ||
        ((child.nodeType === Node.TEXT_NODE || child.nodeType === Node.CDATA_SECTION_NODE) &&
          !!child.textContent?.trim()),
    )
  );
}
