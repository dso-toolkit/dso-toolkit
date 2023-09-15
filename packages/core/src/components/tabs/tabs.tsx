import { Component, Fragment, h } from "@stencil/core";
// import clsx from "clsx";

@Component({
  tag: "dso-tabs",
  styleUrl: "tabs.scss",
  shadow: true,
})
export class Tabs {
  render() {
    return (
      <>
        {/* <ul class="nav nav-tabs" role="tablist">
        ${items.map(
          (item) => html`
            <li
              role="presentation"
              class=${ifDefined(item.modifiers)}
              aria-selected=${item.modifiers === "active"}
              id=${item.id}
              aria-controls="${item.id}-tab"
            >
              <a href="#" role="tab">${item.label}</a>
            </li>
          `
        )}
      </ul>
      ${items.map(
        (item) => html`
          <div
            role="tabpanel"
            tabindex="-1"
            id="${item.id}-tab"
            aria-labelledby=${item.id}
            ?hidden=${item.modifiers !== "active"}
          >
            ${item.content}
          </div>
        `
      )} */}
        <p>Tabs web component</p>
      </>
    );
  }
}
