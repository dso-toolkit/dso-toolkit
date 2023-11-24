import { Templates } from "templates";

export function annotationContent({ selectableTemplate }: Templates) {
  return {
    title: { template: `<h2 slot="title">Annotaties</h2>` },
    addons: {
      template: selectableTemplate(
        {
          type: "checkbox",
          id: "123",
          label: "Toon uitgebreide weergave",
          slot: "addons",
          value: "",
        },
        {
          type: "'checkbox'",
          id: "'123'",
          label: "'Toon uitgebreide weergave'",
          slot: "'addons'",
          value: "''",
        },
      ).template,
    },
    content: {
      template: `
        <div class="dso-rich-content">
          <h3>Locaties</h3>
          <span>Voorbeeld annotatie</span>
        </div>
      `,
    },
  };
}
