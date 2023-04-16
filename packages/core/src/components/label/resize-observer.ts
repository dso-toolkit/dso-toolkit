import { debounce } from "debounce";

export const resizeObserver = new ResizeObserver(
  debounce((entries) => {
    entries.forEach(({ target }) => {
      if (isDsoLabelComponent(target)) {
        target.truncateLabel();
      }
    });
  }, 150)
);

function isDsoLabelComponent(element: Element | HTMLDsoLabelElement): element is HTMLDsoLabelElement {
  return (element as HTMLDsoLabelElement).truncateLabel !== undefined;
}
