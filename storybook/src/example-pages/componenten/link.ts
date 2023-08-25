import { html } from "lit-html";

import { examplePageFactory } from "../../example-page-factory";

examplePageFactory(
  "Toepassingen/Componenten",
  "Link",
  ({ anchorTemplate, buttonTemplate }) => html`
    <div class="container">
      <div class="anchor-example">
        <h2 style="margin-bottom: 24px">Link</h2>
        <div class="row">
          <div class="col-md-3">${anchorTemplate({ label: "Link voorbeeld", url: "#" })}</div>
          <div class="col-md-3">${anchorTemplate({ label: "Externe link", url: "#", mode: "extern" })}</div>
          <div class="col-md-3">${anchorTemplate({ label: "Download link", url: "#", mode: "download" })}</div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <h3 class="toolkit-example-label">Voorbeeld in lopende tekst:</h3>
            <p>
              De ${anchorTemplate({ label: "Bouwregelgeving", url: "#", mode: "extern" })} is een database met alle
              bouwregelgeving in Nederland, die op zodanige wijze moet zijn ingericht en ontsloten dat die voldoet aan
              de ${anchorTemplate({ label: "eisen", url: "#", mode: "download" })} van de Omgevingswet (3B's), en
              daarmee bruikbaar is in de ontwerp- en toetsingsfase van ieder bouwwerk.
            </p>
          </div>
        </div>

        <h2 style="margin-bottom: 24px">Visueel als buttons</h2>
        <div class="row">
          <div class="col-md-4">
            ${buttonTemplate({ variant: "primary", label: "Primary Anchor", url: "#" })}
            ${buttonTemplate({ variant: "secondary", label: "Secondary Anchor", url: "#" })}
          </div>
          <div class="col-md-2">
            ${buttonTemplate({ variant: "tertiary", label: "Tertiary Anchor", modifier: "dso-align", url: "#" })}
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            ${buttonTemplate({ variant: "tertiary", label: "Link button", url: "#" })}
            <!-- IconOnly bestaat niet op anchorTemplate -->
            ${buttonTemplate({ variant: "tertiary", label: "Link button", url: "#", icon: { icon: "info" } })}
            ${buttonTemplate({
              variant: "tertiary",
              label: "Link button",
              url: "#",
              icon: { icon: "angle-left" },
            })}
            ${buttonTemplate({
              variant: "tertiary",
              label: "Link button",
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
