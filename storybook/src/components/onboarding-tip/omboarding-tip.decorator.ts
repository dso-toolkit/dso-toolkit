import { OnboardingTipArgs, OnboardingTipDecorator } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

export const decorator: OnboardingTipDecorator<TemplateResult> = (story, args: OnboardingTipArgs) => html`
  <div class="decorator-wrapper">
    <p>
      Toggle de Storybook control <code>box</code> om de Onboarding Tip te tonen/verbergen en om de Onboarding Tip te
      koppelen aan het nummer van de betreffende box.
    </p>
    <div class="board">
      ${[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => box(args, number))}
      ${typeof args.box === "number" ? story() : undefined}
    </div>

    <style>
      .sb-main-padded.sb-show-main {
        display: flex;
        justify-content: center;
        overflow-x: auto;
      }

      .decorator-wrapper {
        max-inline-size: 900px;
      }

      .board {
        border: 1px solid #555;
        display: grid;
        grid-template-rows: 300px 300px 300px;
        grid-template-columns: 300px 300px 300px;
      }

      .box {
        border: 1px solid #555;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    </style>
  </div>
`;

function box(args: OnboardingTipArgs, index: number) {
  return html`
    <div class="box">
      <div aria-describedby=${ifDefined(args.box === index ? args.id : undefined)}>${index}</div>
    </div>
  `;
}
