import { ComponentImplementation } from "../../templates";
import { ContactInformation } from "dso-toolkit";
import { DsoContactInformation } from "../../components";
import React from "react";

export const reactContactInformation: ComponentImplementation<ContactInformation<JSX.Element>> = {
  component: "contactInformation",
  implementation: "react",
  template: ({ iconTemplate }) =>
    function contactInformationTemplate({ heading, anchorItems, infoItems }) {
      return (
        <DsoContactInformation>
          {heading && <h5 slot="heading">{heading?.children}</h5>}
          {anchorItems && anchorItems.length > 0 && (
            <ul slot="anchor-items">
              {anchorItems?.map((anchor, i) => (
                <li key={i}>
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
          )}
          {infoItems && infoItems.length > 0 && (
            <ul slot="info-items">{infoItems?.map((infoItem, i) => <li key={i}>{infoItem}</li>)}</ul>
          )}
        </DsoContactInformation>
      );
    },
};
