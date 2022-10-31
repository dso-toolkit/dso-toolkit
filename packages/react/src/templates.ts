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

import { reactAccordion } from "./components/accordion/accordion.react-template";
import { reactAlert } from "./components/alert/alert.react-template";
import { reactAttachmentsCounter } from "./components/attachments-counter/attachments-counter.react-template";
import { reactAutosuggest } from "./components/autosuggest/autosuggest.react-template";
import { reactBadge } from "./components/badge/badge.react-template";
import { reactBanner } from "./components/banner/banner.react-template";
import { reactDatePicker } from "./components/date-picker/date-picker.react-template";
import { reactDropdownMenu } from "./components/dropdown-menu/dropdown-menu.react-template";
import { reactHighlightBox } from "./components/highlight-box/highlight-box.react-template";
import { reactIcon } from "./components/icon/icon.react-template";
import { reactInfo } from "./components/info/info.react-template";
import { reactInfoButton } from "./components/info-button/info-button.react-template";
import { reactLabel } from "./components/label/label.react-template";
import { reactOzonContent } from "./components/ozon-content/ozon-content.react-template";
import { reactPagination } from "./components/pagination/pagination.react-template";
import { reactProgressBar } from "./components/progress-bar/progress-bar.react-template";
import { reactProgressIndicator } from "./components/progress-indicator/progress-indicator.react-template";
import { reactSelectable } from "./components/selectable/selectable.react-template";
import { reactTable } from "./components/table/table.react-template";
import { reactToggletip } from "./components/toggletip/toggletip.react-template";
import { reactTooltip } from "./components/tooltip/tooltip.react-template";
import { reactTreeView } from "./components/tree-view/tree-view.react-template";

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

type Implementation = "react";

export type Templates = ComponentsToTemplates<Components, JSX.Element>;
export type ComponentImplementation<Model> = BaseComponentImplementation<Model, Implementation, Templates, JSX.Element>;
export const templateContainer = new TemplateContainer<Implementation, Templates, JSX.Element>();

templateContainer.add(reactAccordion);
templateContainer.add(reactAlert);
templateContainer.add(reactAttachmentsCounter);
templateContainer.add(reactAutosuggest);
templateContainer.add(reactBadge);
templateContainer.add(reactBanner);
templateContainer.add(reactDatePicker);
templateContainer.add(reactDropdownMenu);
templateContainer.add(reactHighlightBox);
templateContainer.add(reactIcon);
templateContainer.add(reactInfo);
templateContainer.add(reactInfoButton);
templateContainer.add(reactLabel);
templateContainer.add(reactOzonContent);
templateContainer.add(reactPagination);
templateContainer.add(reactProgressBar);
templateContainer.add(reactProgressIndicator);
templateContainer.add(reactSelectable);
templateContainer.add(reactTable);
templateContainer.add(reactToggletip);
templateContainer.add(reactTooltip);
templateContainer.add(reactTreeView);
