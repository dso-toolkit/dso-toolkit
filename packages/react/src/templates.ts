import {
  Accordion,
  ActionList,
  Alert,
  AttachmentsCounter,
  Autosuggest,
  Badge,
  Banner,
  BaseComponentImplementation,
  Card,
  CardContainer,
  ComponentsToTemplates,
  DatePicker,
  DatePickerLegacy,
  DropdownMenu,
  Expandable,
  Header,
  HelpcenterPanel,
  HighlightBox,
  Icon,
  ImageOverlay,
  Info,
  InfoButton,
  Label,
  ListButton,
  Modal,
  OzonContent,
  Pagination,
  ProgressBar,
  ProgressIndicator,
  ResponsiveElement,
  Scrollable,
  Selectable,
  SlideToggle,
  Table,
  Tabs,
  TemplateContainer,
  Toggletip,
  Tooltip,
  TreeView,
} from "dso-toolkit";

import { reactAccordion } from "./components/accordion/accordion.react-template";
import { reactActionList } from "./components/action-list/action-list.react-template";
import { reactAlert } from "./components/alert/alert.react-template";
import { reactAttachmentsCounter } from "./components/attachments-counter/attachments-counter.react-template";
import { reactAutosuggest } from "./components/autosuggest/autosuggest.react-template";
import { reactBadge } from "./components/badge/badge.react-template";
import { reactBanner } from "./components/banner/banner.react-template";
import { reactCard } from "./components/card/card.react-template";
import { reactCardContainer } from "./components/card-container/card-container.react-template";
import { reactDatePicker } from "./components/date-picker/date-picker.react-template";
import { reactDatePickerLegacy } from "./components/date-picker-legacy/date-picker-legacy.react-template";
import { reactDropdownMenu } from "./components/dropdown-menu/dropdown-menu.react-template";
import { reactExpandable } from "./components/expandable/expandable.react-template";
import { reactHeader } from "./components/header/header.react-template";
import { reactHelpcenterPanel } from "./components/helpcenter-panel/helpcenter-panel.react-template";
import { reactHighlightBox } from "./components/highlight-box/highlight-box.react-template";
import { reactIcon } from "./components/icon/icon.react-template";
import { reactImageOverlay } from "./components/image-overlay/image-overlay.react-template";
import { reactInfo } from "./components/info/info.react-template";
import { reactInfoButton } from "./components/info-button/info-button.react-template";
import { reactLabel } from "./components/label/label.react-template";
import { reactListButton } from "./components/list-button/list-button.react-template";
import { reactModal } from "./components/modal/modal.react-template";
import { reactOzonContent } from "./components/ozon-content/ozon-content.react-template";
import { reactPagination } from "./components/pagination/pagination.react-template";
import { reactProgressBar } from "./components/progress-bar/progress-bar.react-template";
import { reactProgressIndicator } from "./components/progress-indicator/progress-indicator.react-template";
import { reactResponsiveElement } from "./components/responsive-element/responsive-element.react-template";
import { reactScrollable } from "./components/scrollable/scrollable.react-template";
import { reactSelectable } from "./components/selectable/selectable.react-template";
import { reactSlideToggle } from "./components/slide-toggle/slide-toggle.react-template";
import { reactTable } from "./components/table/table.react-template";
import { reactTabs } from "./components/tabs/tabs.react-template";
import { reactToggletip } from "./components/toggletip/toggletip.react-template";
import { reactTooltip } from "./components/tooltip/tooltip.react-template";
import { reactTreeView } from "./components/tree-view/tree-view.react-template";

export interface Components {
  accordion: Accordion<JSX.Element>;
  actionList: ActionList<JSX.Element>;
  alert: Alert<JSX.Element>;
  attachmentsCounter: AttachmentsCounter;
  autosuggest: Autosuggest<JSX.Element>;
  badge: Badge;
  banner: Banner<JSX.Element>;
  card: Card<JSX.Element>;
  cardContainer: CardContainer<JSX.Element>;
  datePicker: DatePicker;
  datePickerLegacy: DatePickerLegacy;
  dropdownMenu: DropdownMenu;
  expandable: Expandable<JSX.Element>;
  header: Header;
  helpcenterPanel: HelpcenterPanel;
  highlightBox: HighlightBox<JSX.Element>;
  icon: Icon;
  imageOverlay: ImageOverlay;
  info: Info<JSX.Element>;
  infoButton: InfoButton;
  label: Label;
  listButton: ListButton;
  modal: Modal<JSX.Element>;
  ozonContent: OzonContent;
  pagination: Pagination;
  progressBar: ProgressBar;
  progressIndicator: ProgressIndicator;
  responsiveElement: ResponsiveElement<JSX.Element>;
  scrollable: Scrollable<JSX.Element>;
  selectable: Selectable<JSX.Element>;
  slideToggle: SlideToggle;
  table: Table<JSX.Element>;
  tabs: Tabs<JSX.Element>;
  toggletip: Toggletip<JSX.Element>;
  tooltip: Tooltip;
  treeView: TreeView;
}

type Implementation = "react";

export type Templates = ComponentsToTemplates<Components, JSX.Element>;
export type ComponentImplementation<Model> = BaseComponentImplementation<Model, Implementation, Templates, JSX.Element>;
export const templateContainer = new TemplateContainer<Implementation, Templates, JSX.Element>();

templateContainer.add(reactAccordion);
templateContainer.add(reactActionList);
templateContainer.add(reactAlert);
templateContainer.add(reactAttachmentsCounter);
templateContainer.add(reactAutosuggest);
templateContainer.add(reactBadge);
templateContainer.add(reactBanner);
templateContainer.add(reactCard);
templateContainer.add(reactCardContainer);
templateContainer.add(reactDatePicker);
templateContainer.add(reactDatePickerLegacy);
templateContainer.add(reactDropdownMenu);
templateContainer.add(reactExpandable);
templateContainer.add(reactHeader);
templateContainer.add(reactHelpcenterPanel);
templateContainer.add(reactHighlightBox);
templateContainer.add(reactIcon);
templateContainer.add(reactImageOverlay);
templateContainer.add(reactInfo);
templateContainer.add(reactInfoButton);
templateContainer.add(reactLabel);
templateContainer.add(reactListButton);
templateContainer.add(reactModal);
templateContainer.add(reactOzonContent);
templateContainer.add(reactPagination);
templateContainer.add(reactProgressBar);
templateContainer.add(reactProgressIndicator);
templateContainer.add(reactResponsiveElement);
templateContainer.add(reactScrollable);
templateContainer.add(reactSelectable);
templateContainer.add(reactSlideToggle);
templateContainer.add(reactTable);
templateContainer.add(reactTabs);
templateContainer.add(reactToggletip);
templateContainer.add(reactTooltip);
templateContainer.add(reactTreeView);
