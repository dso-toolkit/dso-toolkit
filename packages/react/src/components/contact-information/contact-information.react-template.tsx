import { ComponentImplementation } from "../../templates";
import { ContactInformation } from "dso-toolkit";
import { DsoContactInformation } from "../../components";
import React from "react";

export const reactContactInformation: ComponentImplementation<ContactInformation> = {
  component: "contactInformation",
  implementation: "react",
  template: ({ iconTemplate }) =>
    function contactInformationTemplate({ heading, anchors, infoItems }: ContactInformation) {
      return (
        <DsoContactInformation>
          <h5 slot="heading">{heading}</h5>
          <ul slot="anchors">
            {anchors.map((anchor) => (
              <li>
                <a
                  href={anchor.url}
                  target={anchor.mode === "extern" ? "_blank" : "_self"}
                  rel={anchor.mode === "extern" ? "noopener noreferrer" : undefined}
                >
                  {anchor.icon && iconTemplate({ icon: anchor.icon.icon })}
                  <span>{anchor.label}</span>
                </a>
              </li>
            ))}
          </ul>
          <ul slot="info">
            {infoItems.map((infoItem) => (
              <li>{infoItem}</li>
            ))}
          </ul>
        </DsoContactInformation>
      );
    },
};
