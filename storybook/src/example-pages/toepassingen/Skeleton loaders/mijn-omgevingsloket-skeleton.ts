import { html } from "lit-html";

import { examplePageFactory } from "../../../example-page-factory";

examplePageFactory(
  "Toepassingen/Skeleton loaders",
  "Mijn Omgevingsloket skeleton",
  ({}) =>
    html` <main>
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="skeleton-grey dso-skeleton-heading"></div>
            <hr />
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6">
            <div class="dso-button-row">
              <div class="skeleton-grey  dso-skeleton-button"></div>
              <div class="skeleton-grey  dso-skeleton-button"></div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <div class="skeleton-grey dso-skeleton-text last"></div>
            <hr />
            <div class="skeleton-grey dso-skeleton-text last"></div>
            <hr />
            <div class="skeleton-grey dso-skeleton-text last"></div>
            <hr />
            <div class="skeleton-grey dso-skeleton-text last"></div>
            <hr />
            <div class="skeleton-grey dso-skeleton-text last"></div>
            <hr />
            <div class="skeleton-grey dso-skeleton-text last"></div>
            <hr />
            <div class="skeleton-grey dso-skeleton-text last"></div>
            <hr />
            <div class="skeleton-grey dso-skeleton-text last"></div>
            <hr />
          </div>
        </div>
      </div>
    </main>`,
);
