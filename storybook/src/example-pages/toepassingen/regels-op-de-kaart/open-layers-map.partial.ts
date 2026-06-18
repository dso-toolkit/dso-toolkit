import { TemplateResult, html } from "lit-html";
import { ref } from "lit-html/directives/ref.js";

function renderMapCanvas(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const img = new Image();
  img.src = "images/kaart.png";

  const draw = () => {
    if (!img.complete) return;
    canvas.width = canvas.offsetWidth || 800;
    canvas.height = canvas.offsetHeight || 600;
    const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
    const sw = canvas.width / scale;
    const sh = canvas.height / scale;
    ctx.drawImage(
      img,
      (img.naturalWidth - sw) / 2,
      (img.naturalHeight - sh) / 2,
      sw,
      sh,
      0,
      0,
      canvas.width,
      canvas.height,
    );
  };

  img.onload = draw;
  new ResizeObserver(draw).observe(canvas);
}

export function openLayersMapPartial(): TemplateResult {
  return html`
    <style>
      [slot="map"] {
        block-size: 100%;
        position: relative;
      }

      [slot="map"] > canvas.ol-layer {
        position: absolute;
        inset: 0;
        inline-size: 100%;
        block-size: 100%;
      }

      dso-viewer-grid[print] [slot="map"] {
        min-block-size: 400px;
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
    <canvas class="ol-layer" ${ref((el) => el && renderMapCanvas(el as HTMLCanvasElement))}></canvas>
    <div class="demo-mc">
      <span class="demo-mc-btn demo-mc-btn--active"><dso-icon icon="layers"></dso-icon></span>
      <span class="demo-mc-btn"><dso-icon icon="plus"></dso-icon></span>
      <span class="demo-mc-btn"><dso-icon icon="minus"></dso-icon></span>
    </div>
  `;
}
