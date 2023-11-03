import { StoryFnAngularReturnType } from "@storybook/angular/dist/client/types";
import {
  ActionList,
  Alert,
  Annotation,
  AnnotationButton,
  AnnotationOutput,
  AttachmentsCounter,
  Badge,
  BaseComponentImplementation,
  DatePicker,
  DropdownMenu,
  Expandable,
  Header,
  HelpcenterPanel,
  HighlightBox,
  Icon,
  ImageOverlay,
  Info,
  InfoButton,
  ListButton,
  Modal,
  OzonContent,
  Pagination,
  ProgressBar,
  ProgressIndicator,
  Scrollable,
  Selectable,
  SlideToggle,
  TemplateContainer,
  Toggletip,
} from "dso-toolkit";

import { angularActionList } from "./components/action-list/action-list.angular-template";
import { angularAlert } from "./components/alert/alert.angular-template";
import { angularAnnotationButton } from "./components/annotation-button/annotation-button.angular-template";
import { angularAnnotationOutput } from "./components/annotation-output/annotation-output.angular-template";
import { angularAnnotation } from "./components/annotation/annotation.angular-template";
import { angularAttachmentsCounter } from "./components/attachments-counter/attachments-counter.angular-template";
import { angularBadge } from "./components/badge/badge.angular-template";
import { angularDatePicker } from "./components/date-picker/date-picker.angular-template";
import { angularDropdownMenu } from "./components/dropdown-menu/dropdown-menu.angular-template";
import { angularExpandable } from "./components/expandable/expandable.angular-template";
import { angularHeader } from "./components/header/header.angular-template";
import { angularHelpcenterPanel } from "./components/helpcenter-panel/helpcenter-panel.angular-template";
import { angularHighlightBox } from "./components/highlight-box/highlight-box.angular-template";
import { angularIcon } from "./components/icon/icon.angular-template";
import { angularImageOverlay } from "./components/image-overlay/image-overlay.angular-template";
import { angularInfoButton } from "./components/info-button/info-button.angular-template";
import { angularInfo } from "./components/info/info.angular-template";
import { angularListButton } from "./components/list-button/list-button.angular-template";
import { angularModal } from "./components/modal/modal.angular-template";
import { angularOzonContent } from "./components/ozon-content/ozon-content.angular-template";
import { angularPagination } from "./components/pagination/pagination.angular-template";
import { angularProgressBar } from "./components/progress-bar/progress-bar.angular-template";
import { angularProgressIndicator } from "./components/progress-indicator/progress-indicator.angular-template";
import { angularScrollable } from "./components/scrollable/scrollable.angular-template";
import { angularSelectable } from "./components/selectable/selectable.angular-template";
import { angularSlideToggle } from "./components/slide-toggle/slide-toggle.angular-template";
import { angularToggletip } from "./components/toggletip/toggletip.angular-template";

export interface Components {
  actionList: ActionList<StoryFnAngularReturnType>;
  alert: Alert<StoryFnAngularReturnType>;
  annotation: Annotation<StoryFnAngularReturnType>;
  annotationButton: AnnotationButton;
  annotationOutput: AnnotationOutput<StoryFnAngularReturnType>;
  // autosuggest: Autosuggest<StoryFnAngularReturnType>;
  attachmentsCounter: AttachmentsCounter;
  badge: Badge;
  // card: Card<StoryFnAngularReturnType>;
  // cardContainer: CardContainer<StoryFnAngularReturnType>;
  datePicker: DatePicker;
  dropdownMenu: DropdownMenu;
  expandable: Expandable<StoryFnAngularReturnType>;
  header: Header;
  helpcenterPanel: HelpcenterPanel;
  highlightBox: HighlightBox<StoryFnAngularReturnType>;
  icon: Icon;
  imageOverlay: ImageOverlay;
  info: Info<StoryFnAngularReturnType>;
  infoButton: InfoButton;
  // label: Label;
  listButton: ListButton;
  modal: Modal<StoryFnAngularReturnType>;
  ozonContent: OzonContent;
  pagination: Pagination;
  progressBar: ProgressBar;
  progressIndicator: ProgressIndicator;
  // responsiveElement: ResponsiveElement<StoryFnAngularReturnType>;
  scrollable: Scrollable<StoryFnAngularReturnType>;
  selectable: Selectable<StoryFnAngularReturnType>;
  slideToggle: SlideToggle;
  // table: Table<StoryFnAngularReturnType>;
  toggletip: Toggletip<StoryFnAngularReturnType>;
  // tooltip: Tooltip;
  // treeView: TreeView;
  // viewerGrid: ViewerGrid<StoryFnAngularReturnType>;
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

export type Templates = ComponentsToTemplates<Components, StoryFnAngularReturnType>;
export type ComponentImplementation<Model> = BaseComponentImplementation<
  Model & SlottableTemplate,
  Implementation,
  Templates,
  StoryFnAngularReturnType,
  AngularTemplateFunction<Model, StoryFnAngularReturnType>
>;

type Implementation = "angular";

export const templateContainer = new TemplateContainer<Implementation, Templates, StoryFnAngularReturnType>();

templateContainer.add(angularActionList);
templateContainer.add(angularAlert);
templateContainer.add(angularAnnotation);
templateContainer.add(angularAnnotationButton);
templateContainer.add(angularAnnotationOutput);
templateContainer.add(angularAttachmentsCounter);
templateContainer.add(angularBadge);
templateContainer.add(angularDatePicker);
templateContainer.add(angularDropdownMenu);
templateContainer.add(angularExpandable);
templateContainer.add(angularHeader);
templateContainer.add(angularHelpcenterPanel);
templateContainer.add(angularHighlightBox);
templateContainer.add(angularIcon);
templateContainer.add(angularImageOverlay);
templateContainer.add(angularInfo);
templateContainer.add(angularInfoButton);
templateContainer.add(angularListButton);
templateContainer.add(angularModal);
templateContainer.add(angularOzonContent);
templateContainer.add(angularPagination);
templateContainer.add(angularProgressBar);
templateContainer.add(angularProgressIndicator);
templateContainer.add(angularScrollable);
templateContainer.add(angularSelectable);
templateContainer.add(angularSlideToggle);
templateContainer.add(angularToggletip);
