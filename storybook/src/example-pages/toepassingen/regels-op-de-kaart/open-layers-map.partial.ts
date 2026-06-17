import { TemplateResult, html } from "lit-html";

export function openLayersMapPartial(): TemplateResult {
  return html`
    <style>
      [slot="map"] {
        block-size: 100%;
        position: relative;
        background: url("images/kaart.png") center / cover no-repeat;
        print-color-adjust: exact;
        -webkit-print-color-adjust: exact;
      }

      dso-viewer-grid[print] [slot="map"] {
        min-block-size: 400px;
      }

      [slot="map"] dso-map-message {
        position: absolute;
        z-index: 2;
        top: 16px; /* Align with top of Map Control Buttons and Sizing Button of Main Panel Viewer Grid */
        left: calc(40px + 32px); /* Width of Sizing Button of Main Panel Viewer Grid + margin */
        right: calc(
          16px + 40px + 16px + 132px + 32px
        ); /* Width of Map Control Buttons and it's margin + width of Kaartlagen Button + margin */
      }

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
