import readme from "@dso-toolkit/core/src/components/viewer-grid/readme.md?raw";
import { type Meta } from "@storybook/web-components";
import { ViewerGridArgs, viewerGridMeta, viewerGridStories } from "dso-toolkit";
import { html } from "lit-html";
import { when } from "lit-html/directives/when.js";

import { templateContainer } from "../../templates";

const meta: Meta<ViewerGridArgs> = {
  ...viewerGridMeta({ readme }),
  title: "Core/Viewer Grid",
};

export default meta;

const { ViewerGrid, Filterpanel, DocumentPanel } = viewerGridStories({
  templateContainer,
  storyTemplates: (templates) => {
    const { linkTemplate, viewerGridTemplate, alertTemplate, bannerTemplate, richContentTemplate, buttonTemplate } =
      templates;

    return {
      viewerGridTemplate,
      example: {
        main: (mainExpanded) =>
          html`${alertTemplate({
            status: "info",
            message: html`<p>Dit is <code>slot="main"</code>.</p>`,
          })}
          ${buttonTemplate({
            variant: "tertiary",
            modifier: "dso-toggle-main-button",
            label: mainExpanded ? "Verberg" : "Toon",
            icon: {
              icon: mainExpanded ? "chevron-up" : "chevron-down",
            },
          })}
          ${when(mainExpanded, () =>
            alertTemplate({
              status: "success",
              // eslint-disable-next-line lit/no-useless-template-literals -- template literal is to trigger lit-html html escaping.
              message: html`Dit is de rest in <code>${'<div class="main">'}</code>.`,
            }),
          )}`,
        map: alertTemplate({
          status: "info",
          message: html`<p>Dit is <code>slot="map"</code>.</p>`,
        }),
        documentPanel: alertTemplate({
          status: "info",
          message: html`Dit is <code>slot="document-panel"</code>.`,
        }),
        filterpanel: alertTemplate({
          status: "info",
          message: html`Dit is <code>slot="filterpanel"</code>.`,
        }),
        topBar: bannerTemplate({
          status: "warning",
          content: html`Dit is <code>slot="top-bar"</code>.`,
        }),
        overlay: html`${alertTemplate({
          status: "info",
          message: html`Dit is <code>slot="overlay"</code>.`,
        })}
        ${richContentTemplate({
          children: html`<p>
              Ut elit purus, scelerisque nec tincidunt id, dictum at sapien. Nulla at felis quam. Nullam commodo ex
              ultrices, viverra urna a, pretium arcu. Nunc eget cursus lorem. Sed massa nunc, maximus sodales
              ${linkTemplate({ label: "ultrices", url: "#" })} nec, luctus et lectus. Interdum et malesuada fames ac
              ante ipsum primis in faucibus. Morbi ultrices tincidunt ipsum, sit amet ultricies nulla pulvinar nec. Cras
              sed tellus in nunc viverra aliquam. Aenean sed libero nulla. Curabitur placerat ullamcorper nisl, ut
              facilisis tortor rhoncus a. Etiam vel ex nec eros porttitor aliquam. Duis blandit vel ex at venenatis.
              Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla
              sodales facilisis hendrerit.
            </p>

            <p>
              Ut elit purus, scelerisque nec tincidunt id, dictum at sapien. Nulla at felis quam. Nullam commodo ex
              ultrices, viverra urna a, pretium arcu. Nunc eget cursus lorem. Sed massa nunc, maximus sodales ultrices
              nec, luctus et lectus. Interdum et malesuada fames ac ante
              ${linkTemplate({ label: "ipsum primis", url: "#" })} in faucibus. Morbi ultrices tincidunt ipsum, sit amet
              ultricies nulla pulvinar nec. Cras sed tellus in nunc viverra aliquam. Aenean sed libero nulla. Curabitur
              placerat ullamcorper nisl, ut facilisis tortor rhoncus a. Etiam vel ex nec eros porttitor aliquam. Duis
              blandit vel ex at venenatis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac
              turpis egestas. Nulla sodales facilisis hendrerit.
            </p>`,
        })}`,
      },
    };
  },
});

export { DocumentPanel, Filterpanel, ViewerGrid };
