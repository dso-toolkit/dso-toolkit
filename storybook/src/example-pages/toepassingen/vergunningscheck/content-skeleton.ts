import { html } from "lit-html";

import { examplePageFactory } from "../../../example-page-factory";
import { footerPartial } from "../../partials/footer";
import { headerPartial } from "../../partials/header";
import { header } from "../../partials/header.content";

examplePageFactory(
  "Toepassingen/Vergunningscheck",
  "Skeleton Contentpagina",
  ({}, templates) => html`
    <div class="container">
      ${headerPartial(templates, header)}
      <main>
        <div class="row">
          <div class="col-lg-8 col-xs-12">
            <div class="skeleton-grey dso-skeleton-heading"></div>
            <div>
              <div class="skeleton-grey dso-skeleton-text"></div>
              <div class="skeleton-grey dso-skeleton-text"></div>
              <div class="skeleton-grey dso-skeleton-text"></div>
              <div class="skeleton-grey dso-skeleton-text"></div>
              <div class="skeleton-grey dso-skeleton-text"></div>
            </div>
            <div class="skeleton-grey dso-skeleton-heading"></div>
            <div>
              <div class="skeleton-grey dso-skeleton-text"></div>
              <div class="skeleton-grey dso-skeleton-text"></div>
              <div class="skeleton-grey dso-skeleton-text"></div>
            </div>
          </div>
        </div>
      </main>
      ${footerPartial(templates)}
    </div>
  `,
);

