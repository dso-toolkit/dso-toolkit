import type { IStory } from "@storybook/angular";
import {
  ActionList,
  Alert,
  AttachmentsCounter,
  Badge,
  BaseComponentImplementation,
  DatePicker,
  DropdownMenu,
  Expandable,
  Header,
  HighlightBox,
  Icon,
  ImageOverlay,
  Info,
  InfoButton,
  ListButton,
  Modal,
  OzonContent,
  Pagination,
  ProgressIndicator,
  Scrollable,
  Selectable,
  SlideToggle,
  TemplateContainer,
  Toggletip,
} from "dso-toolkit";

import { angularActionList } from "./components/action-list/action-list.angular-template";
import { angularAlert } from "./components/alert/alert.angular-template";
import { angularAttachmentsCounter } from "./components/attachments-counter/attachments-counter.angular-template";
import { angularBadge } from "./components/badge/badge.angular-template";
import { angularDatePicker } from "./components/date-picker/date-picker.angular-template";
import { angularDropdownMenu } from "./components/dropdown-menu/dropdown-menu.angular-template";
import { angularExpandable } from "./components/expandable/expandable.angular-template";
import { angularHeader } from "./components/header/header.angular-template";
import { angularHighlightBox } from "./components/highlight-box/highlight-box.angular-template";
import { angularIcon } from "./components/icon/icon.angular-template";
import { angularImageOverlay } from "./components/image-overlay/image-overlay.angular-template";
import { angularInfo } from "./components/info/info.angular-template";
import { angularInfoButton } from "./components/info-button/info-button.angular-template";
import { angularListButton } from "./components/list-button/list-button.angular-template";
import { angularModal } from "./components/modal/modal.angular-template";
import { angularOzonContent } from "./components/ozon-content/ozon-content.angular-template";
import { angularPagination } from "./components/pagination/pagination.angular-template";
import { angularProgressIndicator } from "./components/progress-indicator/progress-indicator.angular-template";
import { angularScrollable } from "./components/scrollable/scrollable.angular-template";
import { angularSelectable } from "./components/selectable/selectable.angular-template";
import { angularSlideToggle } from "./components/slide-toggle/slide-toggle.angular-template";
import { angularToggletip } from "./components/toggletip/toggletip.angular-template";

export interface Components {
  actionList: ActionList<IStory>;
  alert: Alert<IStory>;
  // autosuggest: Autosuggest<IStory>;
  attachmentsCounter: AttachmentsCounter;
  badge: Badge;
  // card: Card<IStory>;
  // cardContainer: CardContainer<IStory>;
  datePicker: DatePicker;
  dropdownMenu: DropdownMenu;
  expandable: Expandable<IStory>;
  header: Header;
  highlightBox: HighlightBox<IStory>;
  icon: Icon;
  imageOverlay: ImageOverlay;
  info: Info<IStory>;
  infoButton: InfoButton;
  // label: Label;
  listButton: ListButton;
  modal: Modal<IStory>;
  ozonContent: OzonContent;
  pagination: Pagination;
  progressIndicator: ProgressIndicator;
  // responsiveElement: ResponsiveElement<IStory>;
  scrollable: Scrollable<IStory>;
  selectable: Selectable<IStory>;
  slideToggle: SlideToggle;
  // table: Table<IStory>;
  toggletip: Toggletip<IStory>;
  // tooltip: Tooltip;
  // treeView: TreeView;
  // viewerGrid: ViewerGrid<IStory>;
}

export type DefaultPropValues<Model> = { [P in keyof Required<Model>]: string };
export type PropValues<Model> = { [P in keyof Partial<Model>]: string };

export interface AngularTemplateFunction<Model, TemplateFnReturnType> {
  (model: Model & SlottableTemplate, propValues?: PropValues<Model & SlottableTemplate>): TemplateFnReturnType;
}

export type ComponentsToTemplates<Components, TemplateFnReturnType> = {
  [P in keyof Components & string as `${P}Template`]: AngularTemplateFunction<Components[P], TemplateFnReturnType>;
};

export type SlottableTemplate = {
  slotName?: string;
};

export type Templates = ComponentsToTemplates<Components, IStory>;
export type ComponentImplementation<Model> = BaseComponentImplementation<
  Model & SlottableTemplate,
  Implementation,
  Templates,
  IStory,
  AngularTemplateFunction<Model, IStory>
>;

type Implementation = "angular";

export const templateContainer = new TemplateContainer<Implementation, Templates, IStory>();

// Voeg component implementaties toe
templateContainer.add(angularActionList);
templateContainer.add(angularAlert);
templateContainer.add(angularAttachmentsCounter);
templateContainer.add(angularBadge);
templateContainer.add(angularDatePicker);
templateContainer.add(angularDropdownMenu);
templateContainer.add(angularExpandable);
templateContainer.add(angularHeader);
templateContainer.add(angularHighlightBox);
templateContainer.add(angularIcon);
templateContainer.add(angularImageOverlay);
templateContainer.add(angularInfo);
templateContainer.add(angularInfoButton);
templateContainer.add(angularListButton);
templateContainer.add(angularModal);
templateContainer.add(angularOzonContent);
templateContainer.add(angularPagination);
templateContainer.add(angularProgressIndicator);
templateContainer.add(angularScrollable);
templateContainer.add(angularSelectable);
templateContainer.add(angularSlideToggle);
templateContainer.add(angularToggletip);
