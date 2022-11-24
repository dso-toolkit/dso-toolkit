import { examplePageFactory } from "../../../example-page-factory";
import { content } from "./table-snippet.content";

examplePageFactory("Snippets/Table", "Data Table", ({ tableTemplate }, templates) => tableTemplate(content(templates)));
