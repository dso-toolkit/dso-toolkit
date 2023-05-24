import {
  Accordion,
  ActionList,
  Alert,
  Annotation,
  AnnotationButton,
  AnnotationOutput,
  Anchor,
  ApplicationHeading,
  AttachmentsCounter,
  Autosuggest,
  Badge,
  Banner,
  BaseComponentImplementation,
  Breadcrumbs,
  Button,
  ButtonAnchor,
  ButtonRow,
  Card,
  CardContainer,
  CardGrid,
  CardList,
  ComponentsToTemplates,
  Context,
  DatePicker,
  DefinitionList,
  Description,
  DocumentHeader,
  DocumentList,
  DropdownMenu,
  Footnote,
  Form,
  FormGroup,
  FormGroupCheckboxes,
  FormGroupConfirm,
  FormGroupDatePicker,
  FormGroupFiles,
  FormGroupInput,
  FormGroupInputDate,
  FormGroupInputNumber,
  FormGroupRadios,
  FormGroupSearchBar,
  FormGroupSelect,
  FormGroupStatic,
  FormGroupTextarea,
  FormButtons,
  Header,
  HelpcenterPanel,
  HighlightBox,
  Icon,
  Image,
  ImageOverlay,
  Info,
  InfoButton,
  InputNumber,
  Label,
  LinkList,
  List,
  ListButton,
  MapControls,
  Modal,
  Navbar,
  Pagination,
  ProgressBar,
  ProgressIndicator,
  RichContent,
  SearchBar,
  Selectable,
  ShoppingCart,
  SlideToggle,
  Tabs,
  TemplateContainer,
  Tile,
  Toggletip,
  Tooltip,
  TreeView,
  Whitebox,
  JustifyFormGroups,
  OzonContent,
  LabelGroup,
  TileGrid,
  ViewerGrid,
  RowEqualHeights,
  Table,
  ResponsiveElement,
  ExpandableHeading,
} from "dso-toolkit";

import { TemplateResult } from "lit-html";

import { cssAlert } from "./components/alert/alert.css-template";
import { cssAnchor } from "./components/anchor/anchor.css-template";
import { coreAnnotation } from "./components/annotation/annotation.core-template";
import { coreAnnotationButton } from "./components/annotation-button/annotation-button.core-template";
import { coreAnnotationOutput } from "./components/annotation-output/annotation-output.core-template";
import { cssApplicationHeading } from "./components/application-heading/application-heading.css-template";
import { cssAttachmentsCounter } from "./components/attachments-counter/attachments-counter.css-template";
import { cssBadge } from "./components/badge/badge.css-template";
import { cssBanner } from "./components/banner/banner.css-template";
import { cssBreadcrumbs } from "./components/breadcrumbs/breadcrumbs.css-template";
import { cssButtonRow } from "./components/button-row/button-row.css-template";
import { cssButton } from "./components/button/button.css-template";
import { cssCard } from "./components/card/card.css-template";
import { coreCard } from "./components/card/card.core-template";
import { coreCardContainer } from "./components/card-container/card-container.core-template";
import { cssCardGrid } from "./components/card-grid/card-grid.css-template";
import { cssCardList } from "./components/card-list/card-list.css-template";
import { cssContext } from "./components/context/context.css-template";
import { cssDefinitionList } from "./components/definition-list/definition-list.css-template";
import { cssDescription } from "./components/description/description.css-template";
import { cssDocumentHeader } from "./components/document-header/document-header.css-template";
import { cssHighlightBox } from "./components/highlight-box/highlight-box.css-template";
import { cssIcon } from "./components/icon/icon.css-template";
import { cssSelectable } from "./components/selectable/selectable.css-template";
import { coreAlert } from "./components/alert/alert.core-template";
import { coreAttachmentsCounter } from "./components/attachments-counter/attachments-counter.core-template";
import { coreAutosuggest } from "./components/autosuggest/autosuggest.core-template";
import { coreBadge } from "./components/badge/badge.core-template";
import { coreBanner } from "./components/banner/banner.core-template";
import { coreDatePicker } from "./components/date-picker/date-picker.core-template";
import { coreExpandableHeading } from "./components/expandable-heading/expandable-heading.core-template";
import { coreHighlightBox } from "./components/highlight-box/highlight-box.core-template";
import { coreIcon } from "./components/icon/icon.core-template";
import { coreSelectable } from "./components/selectable/selectable.core-template";
import { cssImage } from "./components/image/image.css-template";
import { cssInfo } from "./components/info/info.css-template";
import { coreHeader } from "./components/header/header.core-template";
import { cssListButton } from "./components/list-button/list-button.css-template";
import { coreListButton } from "./components/list-button/list-button.core-template";
import { cssInputNumber } from "./components/input-number/input-number.css-template";
import { cssList } from "./components/list/list.css-template";
import { cssNavbar } from "./components/navbar/navbar.css-template";
import { cssPagination } from "./components/pagination/pagination.css-template";
import { corePagination } from "./components/pagination/pagination.core-template";
import { cssProgressBar } from "./components/progress-bar/progress-bar.css-template";
import { coreProgressBar } from "./components/progress-bar/progress-bar.core-template";
import { cssProgressIndicator } from "./components/progress-indicator/progress-indicator.css-template";
import { coreProgressIndicator } from "./components/progress-indicator/progress-indicator.core-template";
import { cssSearchBar } from "./components/search-bar/search-bar.css-template";
import { cssShoppingCart } from "./components/shopping-cart/shopping-cart.css-template";
import { cssTabs } from "./components/tabs/tabs.css-template";
import { cssTile } from "./components/tile/tile.css-template";
import { coreToggletip } from "./components/toggletip/toggletip.core-template";
import { cssWhitebox } from "./components/whitebox/whitebox.css-template";
import { cssAccordion } from "./components/accordion/accordion.css-template";
import { coreAccordion } from "./components/accordion/accordion.core-template";
import { coreTreeView } from "./components/tree-view/tree-view.core-template";
import { cssDocumentList } from "./components/document-list/document-list.css-template";
import { coreImageOverlay } from "./components/image-overlay/image-overlay.core-template";
import { cssFootnotes } from "./components/footnotes/footnotes.css-template";
import { cssFootnote } from "./components/footnotes/footnote.css-template";
import { cssInfoButton } from "./components/info-button/info-button.css-template";
import { coreInfoButton } from "./components/info-button/info-button.core-template";
import { coreHelpcenterPanel } from "./components/helpcenter-panel/helpcenter-panel.core-template";
import { cssLabel } from "./components/label/label.css-template";
import { coreLabel } from "./components/label/label.core-template";
import { cssLinkList } from "./components/link-list/link-list.css-template";
import { cssTooltip } from "./components/tooltip/tooltip.css-template";
import { coreTooltip } from "./components/tooltip/tooltip.core-template";
import { coreMapControls } from "./components/map-controls/map-controls.core-template";
import { cssDropdownMenu } from "./components/dropdown-menu/dropdown-menu.css-template";
import { coreDropdownMenu } from "./components/dropdown-menu/dropdown-menu.core-template";
import { cssFormButtons } from "./components/form/form-buttons.css-template";
import { cssJustifyFormGroups } from "./components/justify-form-groups/justify-form-groups.css-template";
import { cssModal } from "./components/modal/modal.css-template";
import { coreModal } from "./components/modal/modal.core-template";
import { coreOzonContent } from "./components/ozon-content/ozon-content.core-template";
import { cssLabelGroup } from "./components/label-group/label-group.css-template";
import { cssTileGrid } from "./components/tile-grid/tile-grid.css-template";
import { coreViewerGrid } from "./components/viewer-grid/viewer-grid.core-template";
import { cssForm } from "./components/form/form.css-template";
import { cssFormGroupCheckboxes } from "./components/form/form-group-checkboxes.css-template";
import { cssFormGroupConfirm } from "./components/form/form-group-confirm.css-template";
import { cssFormGroupDatePicker } from "./components/form/form-group-date-picker.css-template";
import { cssFormGroupFiles } from "./components/form/form-group-files.css-template";
import { cssFormGroupInputNumber } from "./components/form/form-group-input-number.css-template";
import { cssFormGroupInput } from "./components/form/form-group-input.css-template";
import { cssFormGroupRadios } from "./components/form/form-group-radios.css-template";
import { cssFormGroupSearchBar } from "./components/form/form-group-search-bar.css-template";
import { cssFormGroupSelect } from "./components/form/form-group-select.css-template";
import { cssFormGroupStatic } from "./components/form/form-group-static.css-template";
import { cssFormGroupTextarea } from "./components/form/form-group-textarea.css-template";
import { cssFormGroup } from "./components/form/form-group.css-template";
import { coreTable } from "./components/table/table.core-template";
import { coreResponsiveElement } from "./components/responsive-element/responsive-element.core-template";
import { coreInfo } from "./components/info/info.core-template";
import { cssRowEqualHeights } from "./components/row-equal-heights/row-equal-heights.css-template";
import { coreSlideToggle } from "./components/slide-toggle/slide-toggle.core-template";
import { cssRichContent } from "./components/rich-content/rich-content.css-template";
import { coreActionList } from "./components/action-list/action-list.core-template";

export interface Components {
  accordion: Accordion<TemplateResult>;
  actionList: ActionList<TemplateResult>;
  alert: Alert<TemplateResult>;
  anchor: Anchor;
  annotation: Annotation<TemplateResult>;
  annotationButton: AnnotationButton;
  annotationOutput: AnnotationOutput<TemplateResult>;
  applicationHeading: ApplicationHeading;
  attachmentsCounter: AttachmentsCounter;
  autosuggest: Autosuggest<TemplateResult>;
  badge: Badge;
  banner: Banner<TemplateResult>;
  breadcrumbs: Breadcrumbs;
  button: Button | ButtonAnchor;
  buttonRow: ButtonRow;
  cardGrid: CardGrid<TemplateResult>;
  cardList: CardList<TemplateResult>;
  card: Card<TemplateResult>;
  cardContainer: CardContainer<TemplateResult>;
  context: Context<TemplateResult>;
  datePicker: DatePicker;
  definitionList: DefinitionList<TemplateResult>;
  description: Description;
  documentHeader: DocumentHeader<TemplateResult>;
  documentList: DocumentList<TemplateResult>;
  dropdownMenu: DropdownMenu;
  expandableHeading: ExpandableHeading<TemplateResult>;
  footnote: Footnote;
  footnotes: Footnote[];
  formButtons: FormButtons;
  form: Form<TemplateResult>;
  formGroup: FormGroup<TemplateResult>;
  formGroupCheckboxes: FormGroupCheckboxes<TemplateResult>;
  formGroupConfirm: FormGroupConfirm<TemplateResult>;
  formGroupDatePicker: FormGroupDatePicker<TemplateResult>;
  formGroupFiles: FormGroupFiles<TemplateResult>;
  formGroupInput: FormGroupInput<TemplateResult> | FormGroupInputDate<TemplateResult>;
  formGroupInputNumber: FormGroupInputNumber<TemplateResult>;
  formGroupRadios: FormGroupRadios<TemplateResult>;
  formGroupSearchBar: FormGroupSearchBar<TemplateResult>;
  formGroupSelect: FormGroupSelect<TemplateResult>;
  formGroupStatic: FormGroupStatic<TemplateResult>;
  formGroupTextarea: FormGroupTextarea<TemplateResult>;
  header: Header;
  helpcenterPanel: HelpcenterPanel;
  highlightBox: HighlightBox<TemplateResult | string>;
  icon: Icon;
  imageOverlay: ImageOverlay;
  image: Image;
  infoButton: InfoButton;
  info: Info<TemplateResult>;
  inputNumber: InputNumber;
  justifyFormGroups: JustifyFormGroups<TemplateResult>;
  labelGroup: LabelGroup;
  label: Label;
  linkList: LinkList;
  listButton: ListButton;
  list: List;
  mapControls: MapControls;
  modal: Modal<TemplateResult>;
  navbar: Navbar;
  ozonContent: OzonContent<TemplateResult>;
  pagination: Pagination;
  progressBar: ProgressBar;
  progressIndicator: ProgressIndicator;
  responsiveElement: ResponsiveElement<TemplateResult>;
  rowEqualHeights: RowEqualHeights<TemplateResult>;
  richContent: RichContent<TemplateResult>;
  searchBar: SearchBar;
  selectable: Selectable<TemplateResult>;
  shoppingCart: ShoppingCart;
  slideToggle: SlideToggle;
  table: Table<TemplateResult>;
  tabs: Tabs;
  tileGrid: TileGrid;
  tile: Tile;
  toggletip: Toggletip<TemplateResult>;
  tooltip: Tooltip;
  treeView: TreeView;
  viewerGrid: ViewerGrid<TemplateResult>;
  whitebox: Whitebox;
}

type Implementation = "html-css" | "core";

export type SlottableTemplate = {
  slotName?: string;
};

export type Templates = ComponentsToTemplates<Components, TemplateResult>;
export type ComponentImplementation<Model> = BaseComponentImplementation<
  Model & SlottableTemplate,
  Implementation,
  Templates,
  TemplateResult
>;
export const templateContainer = new TemplateContainer<Implementation, Templates, TemplateResult>({
  getNameByKind: (kind: string): string | undefined => {
    if (kind.startsWith("HTML|CSS")) {
      return "html-css";
    }

    if (kind.startsWith("Core")) {
      return "core";
    }

    return undefined;
  },
});

templateContainer.add(coreAccordion);
templateContainer.add(coreActionList);
templateContainer.add(coreAlert);
templateContainer.add(coreAnnotation);
templateContainer.add(coreAnnotationButton);
templateContainer.add(coreAnnotationOutput);
templateContainer.add(coreAttachmentsCounter);
templateContainer.add(coreAutosuggest);
templateContainer.add(coreBadge);
templateContainer.add(coreBanner);
templateContainer.add(coreCard);
templateContainer.add(coreCardContainer);
templateContainer.add(coreDatePicker);
templateContainer.add(coreDropdownMenu);
templateContainer.add(coreExpandableHeading);
templateContainer.add(coreHeader);
templateContainer.add(coreHelpcenterPanel);
templateContainer.add(coreHighlightBox);
templateContainer.add(coreIcon);
templateContainer.add(coreImageOverlay);
templateContainer.add(coreInfo);
templateContainer.add(coreInfoButton);
templateContainer.add(coreLabel);
templateContainer.add(coreListButton);
templateContainer.add(coreMapControls);
templateContainer.add(coreModal);
templateContainer.add(coreOzonContent);
templateContainer.add(corePagination);
templateContainer.add(coreProgressBar);
templateContainer.add(coreProgressIndicator);
templateContainer.add(coreResponsiveElement);
templateContainer.add(coreSelectable);
templateContainer.add(coreSlideToggle);
templateContainer.add(coreTable);
templateContainer.add(coreToggletip);
templateContainer.add(coreTooltip);
templateContainer.add(coreTreeView);
templateContainer.add(coreViewerGrid);

templateContainer.add(cssAccordion);
templateContainer.add(cssAlert);
templateContainer.add(cssAnchor);
templateContainer.add(cssApplicationHeading);
templateContainer.add(cssAttachmentsCounter);
templateContainer.add(cssBadge);
templateContainer.add(cssBanner);
templateContainer.add(cssBreadcrumbs);
templateContainer.add(cssButton);
templateContainer.add(cssButtonRow);
templateContainer.add(cssCard);
templateContainer.add(cssCardGrid);
templateContainer.add(cssCardList);
templateContainer.add(cssContext);
templateContainer.add(cssDefinitionList);
templateContainer.add(cssDescription);
templateContainer.add(cssDocumentHeader);
templateContainer.add(cssDocumentList);
templateContainer.add(cssDropdownMenu);
templateContainer.add(cssFootnote);
templateContainer.add(cssFootnotes);
templateContainer.add(cssForm);
templateContainer.add(cssFormButtons);
templateContainer.add(cssFormGroup);
templateContainer.add(cssFormGroupCheckboxes);
templateContainer.add(cssFormGroupConfirm);
templateContainer.add(cssFormGroupDatePicker);
templateContainer.add(cssFormGroupFiles);
templateContainer.add(cssFormGroupInput);
templateContainer.add(cssFormGroupInputNumber);
templateContainer.add(cssFormGroupRadios);
templateContainer.add(cssFormGroupSearchBar);
templateContainer.add(cssFormGroupSelect);
templateContainer.add(cssFormGroupStatic);
templateContainer.add(cssFormGroupTextarea);
templateContainer.add(cssHighlightBox);
templateContainer.add(cssIcon);
templateContainer.add(cssImage);
templateContainer.add(cssInfo);
templateContainer.add(cssInfoButton);
templateContainer.add(cssInputNumber);
templateContainer.add(cssJustifyFormGroups);
templateContainer.add(cssLabel);
templateContainer.add(cssLabelGroup);
templateContainer.add(cssLinkList);
templateContainer.add(cssList);
templateContainer.add(cssListButton);
templateContainer.add(cssModal);
templateContainer.add(cssNavbar);
templateContainer.add(cssPagination);
templateContainer.add(cssProgressBar);
templateContainer.add(cssProgressIndicator);
templateContainer.add(cssRichContent);
templateContainer.add(cssRowEqualHeights);
templateContainer.add(cssSearchBar);
templateContainer.add(cssSelectable);
templateContainer.add(cssShoppingCart);
templateContainer.add(cssTabs);
templateContainer.add(cssTile);
templateContainer.add(cssTileGrid);
templateContainer.add(cssTooltip);
templateContainer.add(cssWhitebox);
