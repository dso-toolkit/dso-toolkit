import { FormGroupSearchBarArgs } from "../args/form-group-search-bar.args.js";

export const searchBarContent: Omit<FormGroupSearchBarArgs, "infoButtonHandler" | "infoCloseHandler"> = {
  id: "mijn-id",
  label: "Search bar",
  infoButtonLabel: "Toelichting bij veld",
  infoActive: false,
  infoText: '<div class="dso-rich-content"><h5>Heading</h5><p>Rich text</p></div>',
  infoFixed: false,
  searchBarValue: "een waarde",
  searchBarButtonLabel: "Zoeken",
};
