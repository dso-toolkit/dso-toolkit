import { v4 as uuidv4 } from "uuid";
import { html } from "lit-html";

import { examplePageFactory } from "../../../example-page-factory";

const identifier = uuidv4();
const arialabelledbyid = uuidv4();

examplePageFactory(
  "Patronen/Slide Toggle",
  "Slide Toggle met aria-labelledby",
  ({ slideToggleTemplate }) => html`
    <div class="container">
      ${slideToggleTemplate({ identifier, arialabelledbyid })}
      <label for=${arialabelledbyid}>Het label bij de slide toggle</label>
    </div>
  `
);
