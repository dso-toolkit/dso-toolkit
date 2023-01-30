import { v4 as uuidv4 } from "uuid";
import { html } from "lit-html";

import { examplePageFactory } from "../../../example-page-factory";

const identifier = uuidv4();
const arialabelledbyid = uuidv4();

examplePageFactory(
  "Patronen/Slide Toggle",
  "Slide Toggle met paragraph",
  ({ slideToggleTemplate }) => html`
    <div class="container">
      ${slideToggleTemplate({ identifier, arialabelledbyid })}
      <p for=${identifier} id=${arialabelledbyid}>Het label bij de slide toggle</p>
    </div>
  `
);
