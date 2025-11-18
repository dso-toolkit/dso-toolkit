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
import { AngularTemplateResult } from "./components/angular-story-types";
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
  actionList: ActionList<AngularTemplateResult>;
  alert: Alert<AngularTemplateResult>;
  attachmentsCounter: AttachmentsCounter;
  badge: Badge;
  datePicker: DatePicker;
  dropdownMenu: DropdownMenu;
  expandable: Expandable<AngularTemplateResult>;
  header: Header;
  highlightBox: HighlightBox<AngularTemplateResult>;
  icon: Icon;
  imageOverlay: ImageOverlay;
  info: Info<AngularTemplateResult>;
  infoButton: InfoButton;
  listButton: ListButton;
  modal: Modal<AngularTemplateResult>;
  ozonContent: OzonContent;
  pagination: Pagination;
  progressIndicator: ProgressIndicator;
  scrollable: Scrollable<AngularTemplateResult>;
  selectable: Selectable<AngularTemplateResult>;
  slideToggle: SlideToggle;
  toggletip: Toggletip<AngularTemplateResult>;
}

export type DefaultPropValues<Model> = { [P in keyof Required<Model>]: string };
export type PropValues<Model> = { [P in keyof Partial<Model>]: string };

export type SlottableTemplate = {
  slotName?: string;
};

export interface AngularTemplateFunction<Model> {
  (model: Model & SlottableTemplate, propValues?: PropValues<Model & SlottableTemplate>): AngularTemplateResult<Model>;
}
export type ComponentsToTemplates<Components> = {
  [P in keyof Components & string as `${P}Template`]: AngularTemplateFunction<Components[P]>;
};

export type Templates = ComponentsToTemplates<Components>;

export type ComponentImplementation<Model> = BaseComponentImplementation<
  Model & SlottableTemplate,
  Implementation,
  Templates,
  AngularTemplateResult<Model>,
  AngularTemplateFunction<Model>
>;

type Implementation = "angular";

export const templateContainer = new TemplateContainer<Implementation, Templates, AngularTemplateResult>();

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
