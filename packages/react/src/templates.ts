import {
  Alert,
  ComponentsToTemplates,
  TemplateContainer,
  BaseComponentImplementation,
  Accordion,
  AttachmentsCounter,
  Badge,
  Banner,
  DatePicker,
  DropdownMenu,
  HighlightBox,
  Icon,
  Info,
  Label,
  OzonContent,
  Pagination,
  ProgressBar,
  ProgressIndicator,
  Toggletip,
  Tooltip,
  TreeView,
  InfoButton,
  Selectable,
  Table,
  Autosuggest,
} from "@dso-toolkit/sources";

import { reactAlert } from "./components/alert/alert.react-template";

export interface Components {
  alert: Alert<JSX.Element>;
  accordion: Accordion;
  autosuggest: Autosuggest<JSX.Element>;
  attachmentsCounter: AttachmentsCounter;
  badge: Badge;
  banner: Banner<JSX.Element>;
  datePicker: DatePicker;
  dropdownMenu: DropdownMenu;
  highlightBox: HighlightBox<JSX.Element>;
  icon: Icon;
  info: Info<JSX.Element>;
  infoButton: InfoButton;
  label: Label;
  ozonContent: OzonContent;
  pagination: Pagination;
  progressBar: ProgressBar;
  progressIndicator: ProgressIndicator;
  selectable: Selectable<JSX.Element>;
  table: Table;
  toggletip: Toggletip;
  tooltip: Tooltip;
  treeView: TreeView;
}

type Implementation = "react" | "test";

export type Templates = ComponentsToTemplates<Components, JSX.Element>;
export type ComponentImplementation<Model> = BaseComponentImplementation<
  Model,
  Implementation,
  Templates,
  JSX.Element
>;
export const templateContainer = new TemplateContainer<
  Implementation,
  Templates,
  JSX.Element
>();

templateContainer.add(reactAlert);
