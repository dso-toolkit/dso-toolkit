import { AlertType } from "@dso-toolkit/sources";
import { html } from "lit-html";

import { alertTemplate } from "../../alert/alert.template";
import { anchorTemplate } from "../../anchor/anchor.template";
import { badgeTemplate } from "../../badge/badge.template";
import { viewerGridTemplate } from "../templates/viewer-grid.template";

export function viewerGridDocumentItemExampleTemplate() {
  return viewerGridTemplate({
    main: html`
      <ul class="dso-document-list">
        <li>
          <div class="dso-document-list-item">
            <h2>Omgevingsplan gemeente Gouda</h2>
            <div class="dso-document-list-item-container">
              <p class="dso-document-list-item-type">Omgevingsplan</p>
              <p class="dso-document-list-item-owner">Gemeente Gouda</p>
              <p class="dso-document-list-item-status">
                ${badgeTemplate({
                  status: "warning",
                  message: "Ontwerp",
                })}Bekendgemaakt 01-03-2021
              </p>
              ${anchorTemplate({
                url: "#",
                label: "Hele document bekijken",
                modifier: "dso-document-list-item-open-document",
              })}
            </div>
          </div>
        </li>
        <li>
          <div class="dso-document-list-item">
            <h2>Omgevingsplan gemeente Gooise Meren</h2>
            <div class="dso-document-list-item-container">
              <p class="dso-document-list-item-type">Omgevingsplan</p>
              <p class="dso-document-list-item-owner">Gemeente Gooise Meren</p>
              <p class="dso-document-list-item-status">
                ${badgeTemplate({
                  status: "warning",
                  message: "Ontwerp",
                })}In werking vanaf 01-10-2022
              </p>
              ${anchorTemplate({
                url: "#",
                label: "Hele document bekijken",
                modifier: "dso-document-list-item-open-document",
              })}
            </div>
          </div>
        </li>
      </ul>
    `,
    map: alertTemplate({ message: 'Dit is de kaart', status: AlertType.Info })
  });
};
