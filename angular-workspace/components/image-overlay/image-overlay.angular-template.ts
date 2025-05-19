import { ImageOverlay } from "dso-toolkit";

import { ComponentImplementation } from "../../templates";

export const angularImageOverlay: ComponentImplementation<ImageOverlay> = {
  component: "imageOverlay",
  implementation: "angular",
  template: () =>
    function imageOverlayTemplate(props) {
      return {
        props,
        template: `
          <dso-image-overlay>
            <div slot="titel">
              <span>Afbeelding 1</span>
            </div>
            <img
              [src]="image.source"
              [class]="image.modifier"
              [alt]="image.alt"
              [attr.width]="image.width"
              [attr.height]="image.height"
            >
            <div slot="bijschrift">
              <span>Bijschrift bij afbeelding</span>
            </div>
          </dso-image-overlay>
        `,
      };
    },
};
