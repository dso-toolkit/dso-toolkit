import { examplePageFactory } from "../../../example-page-factory";
import { content } from "./table-snippet.content";

examplePageFactory("Voorbeeldpagina's", "Snippets/Table", "Data Table", ({ tableTemplate }, templates) =>
  tableTemplate(content(templates)),
);
