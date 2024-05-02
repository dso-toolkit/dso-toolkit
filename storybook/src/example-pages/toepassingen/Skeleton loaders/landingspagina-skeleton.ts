import { html } from "lit-html";

import { examplePageFactory } from "../../../example-page-factory";

examplePageFactory(
  "Toepassingen/Skeleton loaders",
  "Landingspagina skeleton",
  ({}) =>
    html` <main>
      <div class="container">
        <div class="row dso-banner">
          <div class="col-lg-6 col-sm-8">
            <div class="dso-highlight-box dso-white dso-drop-shadow">
              <div class="dso-rich-content">
                <div class="skeleton-grey dso-skeleton-heading"></div>
                <div>
                  <div class="skeleton-grey dso-skeleton-text"></div>
                  <div class="skeleton-grey dso-skeleton-text"></div>
                  <div class="skeleton-grey dso-skeleton-text"></div>
                </div>
                <div class="skeleton-grey dso-skeleton-button"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-8">
            <div class="dso-rich-content">
              <div class="skeleton-grey dso-skeleton-heading"></div>
              <div class="skeleton-grey dso-skeleton-text"></div>
              <div class="skeleton-grey dso-skeleton-text"></div>
              <div class="skeleton-grey dso-skeleton-text"></div>
              <div class="skeleton-grey dso-skeleton-text last"></div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="dso-highlight-box dso-border">
              <div class="dso-rich-content">
                <div class="skeleton dso-skeleton-text"></div>
                <div class="skeleton-grey dso-skeleton-heading"></div>
                <div class="skeleton-grey dso-skeleton-text"></div>
                <div class="skeleton-grey dso-skeleton-text"></div>
                <div class="skeleton-grey dso-skeleton-text"></div>
                <div class="skeleton-grey dso-skeleton-text last"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="row dso-featured">
          <div class="col-xs-12">
            <div class="skeleton-grey dso-skeleton-heading"></div>
            <div class="row dso-equal-heights">
              <div class="col-md-3 col-sm-6">
                <div class="dso-highlight-box dso-white dso-drop-shadow">
                  <div class="dso-rich-content">
                    <div class="skeleton-grey dso-skeleton-heading"></div>
                    <div class="skeleton-grey dso-skeleton-text"></div>
                  </div>
                </div>
              </div>
              <div class="col-md-3 col-sm-6">
                <div class="dso-highlight-box dso-white dso-drop-shadow">
                  <div class="dso-rich-content">
                    <div class="skeleton-grey dso-skeleton-heading"></div>
                    <div class="skeleton-grey dso-skeleton-text"></div>
                  </div>
                </div>
              </div>
              <div class="col-md-3 col-sm-6">
                <div class="dso-highlight-box dso-white dso-drop-shadow">
                  <div class="dso-rich-content">
                    <div class="skeleton-grey dso-skeleton-heading"></div>
                    <div class="skeleton-grey dso-skeleton-text"></div>
                  </div>
                </div>
              </div>
              <div class="col-md-3 col-sm-6">
                <div class="dso-highlight-box dso-white dso-drop-shadow">
                  <div class="dso-rich-content">
                    <div class="skeleton-grey dso-skeleton-heading"></div>
                    <div class="skeleton dso-skeleton-text"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row dso-equal-heights">
              <div class="col-md-3 col-sm-6">
                <div class="dso-highlight-box dso-white dso-drop-shadow">
                  <div class="dso-rich-content">
                    <div class="skeleton-grey dso-skeleton-heading"></div>
                    <div class="skeleton-grey dso-skeleton-text"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row dso-equal-heights">
          <div class="col-md-8">
            <div class="skeleton-grey dso-skeleton-heading"></div>
            <div class="skeleton-grey dso-skeleton-text"></div>
            <div class="skeleton-grey dso-skeleton-text"></div>
            <div class="skeleton-grey dso-skeleton-text"></div>
            <div class="skeleton-grey dso-skeleton-text"></div>
            <div class="skeleton-grey dso-skeleton-text"></div>
            <div class="skeleton-grey dso-skeleton-text"></div>
          </div>
        </div>
      </div>
    </main>`,
);
