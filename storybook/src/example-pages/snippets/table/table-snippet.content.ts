import { Table } from "dso-toolkit";
import { html, TemplateResult } from "lit-html";
import { Templates } from "../../../templates";

function actionsTemplate({ buttonTemplate }: Templates) {
  return html`${buttonTemplate({
    type: "button",
    variant: "tertiary",
    label: "Bewerk",
    icon: { icon: "pencil" },
    iconMode: "only",
  })}
  ${buttonTemplate({
    type: "button",
    variant: "tertiary",
    label: "Verwijder",
    icon: { icon: "trash" },
    iconMode: "only",
  })}`;
}

interface Options {
  role?: string;
  actions?: boolean;
}

export function content(templates: Templates, { role, actions }: Options = {}): Table<TemplateResult> {
  const { anchorTemplate } = templates;

  return {
    headingColumns: true,
    noModal: true,
    role,
    content: {
      caption: "Overzicht toegevoegde documenten",
      head: [{ label: "#" }, { label: "Documentnaam" }, { label: "Eigenaar" }, { label: "Upload datum" }].concat(
        actions ? { label: "Acties" } : [],
      ),
      rows: [
        ["1", anchorTemplate({ label: "Tekening.jpg", url: "#tekening" }), "P.K. Puk", "21-07-2019"].concat(
          actions ? actionsTemplate(templates) : [],
        ),
        ["2", anchorTemplate({ label: "Omgevingsplan.jpg", url: "#omgevingsplan" }), "H.G. Griff", "22-07-2019"].concat(
          actions ? actionsTemplate(templates) : [],
        ),
        ["3", anchorTemplate({ label: "Bodemonderzoek.jpg", url: "#bodemonderzoek" }), "P.K. Puk", "23-07-2019"].concat(
          actions ? actionsTemplate(templates) : [],
        ),
        ["4", anchorTemplate({ label: "Maatregelen.jpg", url: "#maatregelen" }), "P.K. Puk", "23-07-2019"].concat(
          actions ? actionsTemplate(templates) : [],
        ),
        ["5", anchorTemplate({ label: "Plattegrond.jpg", url: "#omgevingsplan" }), "P.K. Puk", "28-07-2019"].concat(
          actions ? actionsTemplate(templates) : [],
        ),
      ],
    },
  };
}
