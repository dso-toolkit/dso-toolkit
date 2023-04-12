export const mutationObserver = new MutationObserver((entries) => {
  entries.forEach((entry) => {
    const component = entry.target;

    if (isDsoLabelComponent(component)) {
      component.updateTooltipText();
    }
  });
});

function isDsoLabelComponent(element: Node | HTMLDsoLabelElement): element is HTMLDsoLabelElement {
  return (element as HTMLDsoLabelElement).updateTooltipText !== undefined;
}
