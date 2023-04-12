export const resizeObserver = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    const component = entry.target;

    if (isDsoLabelComponent(component)) {
      component.truncateLabel();
    }
  });
});

function isDsoLabelComponent(element: Element | HTMLDsoLabelElement): element is HTMLDsoLabelElement {
  return (element as HTMLDsoLabelElement).truncateLabel !== undefined;
}
