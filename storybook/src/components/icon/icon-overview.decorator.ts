import { IconOverviewDecorator } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";

export const decorator: IconOverviewDecorator<TemplateResult> = (story, icons) => html`
  <ul id="icon-overview-list" class="icon-overview-list">
    ${icons.map((icon) => {
      return html`<li>
        ${story({ args: { icon } })}
        <br /><code>${icon}</code>
      </li>`;
    })}
  </ul>

  <style>
    .icon-overview-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      list-style: none;
      padding: 0;
      margin: 16px 48px;
      gap: 4px;
    }

    li {
      text-align: center;
      padding: 16px;
      background-color: #efefef;
    }

    dso-icon {
      margin-block-end: 16px;
    }
  </style>
`;
