import { TemplateResult, html } from "lit-html";
import { PartialStoryFn } from "storybook/internal/types";

export const decorator = (story: PartialStoryFn): TemplateResult => html`<div class="container">${story()}</div>`;
