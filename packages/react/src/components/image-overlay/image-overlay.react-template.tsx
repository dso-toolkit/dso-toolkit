import { ImageOverlay } from "dso-toolkit";
import * as React from "react";

import { DsoImageOverlay } from "../../components";
import { ComponentImplementation } from "../../templates";

export const reactImageOverlay: ComponentImplementation<ImageOverlay> = {
  component: "imageOverlay",
  implementation: "react",
  template: () =>
    function imageOverlayTemplate({ image }) {
      return (
        <DsoImageOverlay>
          <div slot="titel">
            <span>Afbeelding 1</span>
          </div>
          <img
            src={image.source}
            className={image.modifier}
            alt={image.alt}
            width={image.width}
            height={image.height}
          />
          <div slot="bijschrift">
            <span>Bijschrift bij afbeelding</span>
          </div>
        </DsoImageOverlay>
      );
    },
};
