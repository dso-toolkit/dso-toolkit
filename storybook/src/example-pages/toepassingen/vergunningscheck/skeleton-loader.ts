import { html } from "lit-html";

import { examplePageFactory } from "../../../example-page-factory";
import { footerPartial } from "../../partials/footer";
import { headerPartial } from "../../partials/header";
import { header } from "../../partials/header.content";

examplePageFactory(
  "Toepassingen/Vergunningscheck",
  "Skeleton loader",
  ({ highlightBoxTemplate, richContentTemplate }, templates) => html`
    <div class="container">
      ${headerPartial(templates, header)}
      <main>
        <div class="row dso-banner">
          <div class="col-lg-6 col-sm-8">
            ${highlightBoxTemplate({
              white: true,
              content: richContentTemplate({
                children: html`
                  <div class="skeleton-green dso-skeleton-heading"></div>
                  <div class="skeleton dso-skeleton-text"></div>
                  <div class="skeleton dso-skeleton-text"></div>
                  <div class="skeleton dso-skeleton-text"></div>
                  <div class="skeleton dso-skeleton-text last"></div>
                  <div class="skeleton-green dso-skeleton-button"></div>
                `,
              }),
            })}
          </div>
        </div>
        <div class="row">
          <div class="col-lg-8">
            ${richContentTemplate({
              children: html`
                <div class="skeleton-green dso-skeleton-heading"></div>
                <div class="skeleton dso-skeleton-text"></div>
                <div class="skeleton dso-skeleton-text"></div>
                <div class="skeleton dso-skeleton-text"></div>
                <div class="skeleton dso-skeleton-text last"></div>
              `,
            })}
          </div>
          <div class="col-lg-4">
            ${highlightBoxTemplate({
              border: true,
              white: true,
              content: richContentTemplate({
                children: html`
                  <div class="skeleton-green dso-skeleton-heading"></div>
                  <div class="skeleton dso-skeleton-text"></div>
                  <div class="skeleton dso-skeleton-text"></div>
                  <div class="skeleton dso-skeleton-text"></div>
                  <div class="skeleton dso-skeleton-text last"></div>
                `,
              }),
            })}
          </div>
        </div>
        <div class="row dso-featured">
          <div class="col-xs-12">
            <div class="skeleton-green dso-skeleton-heading"></div>
            <div class="row dso-equal-heights">
              <div class="col-md-3 col-sm-6">
                ${highlightBoxTemplate({
                  white: true,
                  dropShadow: true,
                  content: richContentTemplate({
                    children: html`
                      <div class="skeleton-green dso-skeleton-heading"></div>
                      <div class="skeleton dso-skeleton-text"></div>
                    `,
                  }),
                })}
              </div>
              <div class="col-md-3 col-sm-6">
                ${highlightBoxTemplate({
                  white: true,
                  dropShadow: true,
                  content: richContentTemplate({
                    children: html`
                      <div class="skeleton-green dso-skeleton-heading"></div>
                      <div class="skeleton dso-skeleton-text"></div>
                    `,
                  }),
                })}
              </div>
              <div class="col-md-3 col-sm-6">
                ${highlightBoxTemplate({
                  white: true,
                  dropShadow: true,
                  content: richContentTemplate({
                    children: html`
                      <div class="skeleton-green dso-skeleton-heading"></div>
                      <div class="skeleton dso-skeleton-text"></div>
                    `,
                  }),
                })}
              </div>
              <div class="col-md-3 col-sm-6">
                ${highlightBoxTemplate({
                  white: true,
                  dropShadow: true,
                  content: richContentTemplate({
                    children: html`
                      <div class="skeleton-green dso-skeleton-heading"></div>
                      <div class="skeleton dso-skeleton-text"></div>
                    `,
                  }),
                })}
              </div>
            </div>
            <div class="row dso-equal-heights">
              <div class="col-md-3 col-sm-6">
                ${highlightBoxTemplate({
                  white: true,
                  dropShadow: true,
                  content: richContentTemplate({
                    children: html`
                      <div class="skeleton-green dso-skeleton-heading"></div>
                      <div class="skeleton dso-skeleton-text"></div>
                    `,
                  }),
                })}
              </div>
            </div>
          </div>
        </div>
        <div class="row dso-equal-heights">
          <div class="col-md-8">
            <div class="skeleton-green dso-skeleton-heading"></div>
            <div class="skeleton dso-skeleton-text"></div>
            <div class="skeleton dso-skeleton-text"></div>
            <div class="skeleton dso-skeleton-text"></div>
            <div class="skeleton dso-skeleton-text"></div>
            <div class="skeleton dso-skeleton-text"></div>
            <div class="skeleton dso-skeleton-text"></div>
          </div>
        </div>
      </main>
      ${footerPartial(templates)}
    </div>
  `,
);
