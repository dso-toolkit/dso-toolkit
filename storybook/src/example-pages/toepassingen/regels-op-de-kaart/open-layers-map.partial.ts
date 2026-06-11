import { TemplateResult, html } from "lit-html";

export function openLayersMapPartial(): TemplateResult {
  return html`
    <style>
      .demo-mc {
        position: absolute;
        inset-block-start: 16px;
        inset-inline-end: 16px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        color: #39870c;
      }

      .demo-mc-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fff;
        border-radius: 4px;
        padding: 8px;
        box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.3);
      }

      .demo-mc-btn--active {
        background-color: #275937;
        color: #fff;
      }
    </style>
    <div class="demo-mc">
      <span class="demo-mc-btn demo-mc-btn--active"><dso-icon icon="layers"></dso-icon></span>
      <span class="demo-mc-btn"><dso-icon icon="plus"></dso-icon></span>
      <span class="demo-mc-btn"><dso-icon icon="minus"></dso-icon></span>
    </div>
  `;
}
