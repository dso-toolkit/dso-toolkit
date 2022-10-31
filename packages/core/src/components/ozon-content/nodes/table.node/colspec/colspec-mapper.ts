import { Colspecs } from "./colspec.interface";

export function mapColspecs(count: number, nodeList: NodeListOf<Element>): Colspecs {
  const elements = Array.from(nodeList);
  const totalWidth = getTotalWidth(elements);

  return {
    totalWidth,
    count,
    columns: elements.map((element, index) => {
      const colNumber = element.getAttribute("colnum");

      return {
        name: element.getAttribute("colname") ?? "",
        number: colNumber ? parseInt(colNumber, 10) : index + 1,
        width: getWidth(totalWidth, element),
      };
    }),
  };
}

function getTotalWidth(elements: Element[]): number {
  return elements.reduce((totalWidth, element) => {
    const width = element.getAttribute("colwidth")?.replace(/[^0-9]/, "") ?? "";
    const colWidth = parseInt(width, 10);

    return totalWidth + (isNaN(colWidth) ? 0 : colWidth);
  }, 0);
}

function getWidth(totalWidth: number, element: Element): string | undefined {
  const width = element.getAttribute("colwidth");

  if (!width) {
    return undefined;
  }

  if (width === "*") {
    return "100%";
  }

  if (width.includes("*") || width.match(/^[\d+]$/)) {
    const colWidth = parseInt(width.replace(/[^0-9]/, ""), 10);

    return `${Math.round((colWidth / totalWidth) * 100)}%`;
  }

  return width;
}
