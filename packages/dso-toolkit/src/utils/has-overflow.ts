export function hasOverflow(el: Element): boolean {
  const style = window.getComputedStyle(el);
  const overflowX = style.getPropertyValue("overflow-x");
  const overflowY = style.getPropertyValue("overflow-y");
  const overflowValues = ["hidden", "clip"];
  return overflowValues.indexOf(overflowX) !== -1 || overflowValues.indexOf(overflowY) !== -1;
}
