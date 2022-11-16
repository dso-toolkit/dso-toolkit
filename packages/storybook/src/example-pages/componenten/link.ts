import { html } from "lit-html";

import { examplePageFactory } from "../../example-page-factory";

examplePageFactory(
  "Toepassingen/Componenten",
  "Link",
  ({ anchorTemplate }) => html`
    <div class="container">
      <div class="anchor-example">
        <h2 style="margin-bottom: 24px">Link</h2>
        <div class="row">
          <div class="col-md-3">${anchorTemplate({ label: "Link voorbeeld", url: "#" })}</div>
          <div class="col-md-3">${anchorTemplate({ label: "Externe link", url: "#", modifier: "extern" })}</div>
          <div class="col-md-3">${anchorTemplate({ label: "Download link", url: "#", modifier: "download" })}</div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <h3 class="toolkit-example-label">Voorbeeld in lopende tekst:</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Nullam dictum
              felis eu pede ${anchorTemplate({ label: "mollis pretium", url: "#", modifier: "extern" })}. Integer
              tincidunt. Cras dapibus. Vivamus ${anchorTemplate({ label: "elementum", url: "#", modifier: "extern" })}
              semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend
              ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut
              metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur
              ullamcorper ${anchorTemplate({ label: "ultricies nisi", url: "#", modifier: "download" })}.
            </p>
          </div>
        </div>

        <h2 style="margin-bottom: 24px">Visueel als buttons</h2>
        <div class="row">
          <div class="col-md-3">
            ${anchorTemplate({ label: "Anchor", modifier: "dso-primary", url: "#" })}
            ${anchorTemplate({ label: "Anchor", modifier: "dso-secondary", url: "#" })}
          </div>
          <div class="col-md-2">
            ${anchorTemplate({ label: ".btn-align", modifier: "dso-tertiary btn-align", url: "#" })}
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            ${anchorTemplate({ label: "Link button", modifier: "dso-tertiary", url: "#" })}
            <!-- IconOnly bestaat niet op anchorTemplate -->
            ${anchorTemplate({ label: "Link button", modifier: "dso-tertiary", url: "#", icon: { icon: "info" } })}
            ${anchorTemplate({
              label: "Link button",
              modifier: "dso-tertiary",
              url: "#",
              icon: { icon: "angle-left" },
            })}
            ${anchorTemplate({
              label: "Link button",
              modifier: "dso-tertiary",
              url: "#",
              icon: { icon: "angle-right" },
              iconMode: "after",
            })}
          </div>
        </div>
      </div>
    </div>
  `
);
