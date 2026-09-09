import readme from "@dso-toolkit/core/src/components/viewer-grid/readme.md?raw";
import type { Meta } from "@storybook/web-components-vite";
import { TemplateResult, html } from "lit-html";
import { when } from "lit-html/directives/when.js";
import { compiler } from "markdown-to-jsx/react";
import { Renderer } from "storybook/internal/types";
import { fn } from "storybook/test";

import { StoryObj } from "../../shared/story-obj.js";
import { alertTemplate } from "../alert/alert.template.js";
import { bannerTemplate } from "../banner/banner.template.js";
import { buttonTemplate } from "../button/button.template.js";
import { linkTemplate } from "../link/link.template.js";
import { richContentTemplate } from "../rich-content/rich-content.template.js";

import { ViewerGridArgs, ViewerGridExample, viewerGridArgTypes, viewerGridArgsMapper } from "./viewer-grid.args.js";
import { viewerGridTemplate } from "./viewer-grid.template.js";

type ViewerGridStory = StoryObj<ViewerGridArgs, Renderer>;

type ViewerGridStoryArgs = Pick<
  ViewerGridArgs,
  | "mainSize"
  | "filterPanelOpen"
  | "filterPanelTitle"
  | "overlayOpen"
  | "documentPanelOpen"
  | "documentPanelSize"
  | "mainPanelExpanded"
  | "mainPanelHidden"
  | "activeTab"
>;

const meta: Meta<ViewerGridArgs> = {
  title: "Core/Viewer Grid",
  argTypes: viewerGridArgTypes,
  args: {
    dsoActiveTabSwitch: fn(),
    dsoMainSizeChangeAnimationEnd: fn(),
    dsoCloseOverlay: fn(),
    dsoCloseFilterPanel: fn(),
    dsoDocumentPanelSizeChange: fn(),
    dsoDocumentPanelSizeChangeAnimationEnd: fn(),
    dsoMainPanelToggle: fn(),
  },
  parameters: {
    controls: {
      hideNoControlsWarning: true,
    },
    docs: {
      page: () => compiler(readme),
    },
  },
};

export default meta;

const defaultArgs: ViewerGridStoryArgs = {
  mainSize: "large",
  filterPanelOpen: false,
  filterPanelTitle: "Titel van het filter paneel",
  overlayOpen: false,
  documentPanelOpen: false,
  documentPanelSize: "small",
  mainPanelExpanded: true,
  mainPanelHidden: false,
  activeTab: "search",
};

const parameters = { layout: "fullscreen" as const };

const example: ViewerGridExample<TemplateResult> = {
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
  filterPanel: alertTemplate({
    status: "info",
    message: html`Dit is <code>slot="filter-panel"</code>.`,
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
        Ut elit purus, scelerisque nec tincidunt id, dictum at sapien. Nulla at felis quam. Nullam commodo ex ultrices,
        viverra urna a, pretium arcu. Nunc eget cursus lorem. Sed massa nunc, maximus sodales
        ${linkTemplate({ label: "ultrices", url: "#" })} nec, luctus et lectus. Interdum et malesuada fames ac ante
        ipsum primis in faucibus. Morbi ultrices tincidunt ipsum, sit amet ultricies nulla pulvinar nec. Cras sed tellus
        in nunc viverra aliquam. Aenean sed libero nulla. Curabitur placerat ullamcorper nisl, ut facilisis tortor
        rhoncus a. Etiam vel ex nec eros porttitor aliquam. Duis blandit vel ex at venenatis. Pellentesque habitant
        morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla sodales facilisis hendrerit.
      </p>

      <p>
        Ut elit purus, scelerisque nec tincidunt id, dictum at sapien. Nulla at felis quam. Nullam commodo ex ultrices,
        viverra urna a, pretium arcu. Nunc eget cursus lorem. Sed massa nunc, maximus sodales ultrices nec, luctus et
        lectus. Interdum et malesuada fames ac ante ${linkTemplate({ label: "ipsum primis", url: "#" })} in faucibus.
        Morbi ultrices tincidunt ipsum, sit amet ultricies nulla pulvinar nec. Cras sed tellus in nunc viverra aliquam.
        Aenean sed libero nulla. Curabitur placerat ullamcorper nisl, ut facilisis tortor rhoncus a. Etiam vel ex nec
        eros porttitor aliquam. Duis blandit vel ex at venenatis. Pellentesque habitant morbi tristique senectus et
        netus et malesuada fames ac turpis egestas. Nulla sodales facilisis hendrerit.
      </p>`,
  })}`,
};

const render = (args: ViewerGridArgs) => viewerGridTemplate(viewerGridArgsMapper(args, example));

export const ViewerGrid: ViewerGridStory = {
  args: defaultArgs,
  render,
  parameters,
};

export const FilterPanel: ViewerGridStory = {
  args: {
    ...defaultArgs,
    mainSize: "medium",
    filterPanelOpen: true,
    documentPanelSize: "medium",
  },
  render,
  parameters,
};

export const DocumentPanel: ViewerGridStory = {
  args: {
    ...defaultArgs,
    documentPanelOpen: true,
    documentPanelSize: "medium",
    mainPanelExpanded: false,
    mainPanelHidden: true,
    activeTab: "document",
  },
  render,
  parameters,
};
