import { html } from "lit-html";

import { examplePageFactory } from "../../../example-page-factory";

examplePageFactory(
  "Toepassingen/Skeleton loaders",
  "content skeleton",
  () =>
    html` <main>
      <div class="container">
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
            <div class="skeleton-grey dso-skeleton-heading"></div>
            <div>
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
      </div>
    </main>`,
);
