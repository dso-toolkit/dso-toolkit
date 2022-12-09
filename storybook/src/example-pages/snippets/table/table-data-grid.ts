import { examplePageFactory } from "../../../example-page-factory";
import { content } from "./table-snippet.content";

examplePageFactory("Snippets/Table", "Data Grid", ({ tableTemplate }, templates) =>
  tableTemplate(content(templates, { role: "grid", actions: true }))
);
