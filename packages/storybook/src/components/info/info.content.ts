import { html } from "lit-html";
import { Templates } from "../../templates";

export function richContent({ buttonTemplate, anchorTemplate }: Templates) {
  return html`
    <div class="dso-rich-content">
      <h2>Heading 2</h2>

      <p>
        Lorem ipsum dolor sit amet, <strong>consectetur</strong> adipiscing elit. Nullam non metus dolor. Pellentesque
        velit arcu, pellentesque at lacus sit amet, porta semper est. Praesent mollis lorem lorem, non varius nisl
        lacinia et. Integer quis sollicitudin arcu. ${anchorTemplate({ label: "Nullam", url: "#" })} lacinia non ipsum
        sit amet varius. Praesent consequat ligula id tortor elementum pretium. Integer ligula justo, volutpat sed
        tellus eu, faucibus fringilla lectus.
      </p>

      <div class="dso-button-row">
        ${buttonTemplate({ variant: "primary", label: "Primaire button", url: "#" })}
        ${buttonTemplate({ variant: "secondary", label: "Secundaire button", url: "#" })}
        ${buttonTemplate({
          variant: "tertiary",
          label: "Tertiare button",
          icon: { icon: "chevron-down" },
          iconMode: "after",
          url: "#",
        })}
      </div>
    </div>
  `;
}
