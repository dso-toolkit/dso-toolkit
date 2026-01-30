import {
  // Start: named template model imports
  Accordion,
  ActionList,
  AdvancedSelect,
  Alert,
  Annotation,
  ApplicationHeading,
  AttachmentsCounter,
  Autosuggest,
  Badge,
  Banner,
  BaseComponentImplementation,
  Breadcrumbs,
  Button,
  ButtonAnchor,
  ButtonGroup,
  ButtonRow,
  Card,
  CardContainer,
  CardGrid,
  CardList,
  ComponentsToTemplates,
  ContactInformation,
  Context,
  CursorTooltip,
  DatePicker,
  DefinitionList,
  Description,
  DocumentCard,
  DocumentComponent,
  DocumentHeader,
  DropdownMenu,
  Expandable,
  Footer,
  Footnote,
  Form,
  FormButtons,
  FormGroup,
  FormGroupCheckboxes,
  FormGroupConfirm,
  FormGroupDatePicker,
  FormGroupFiles,
  FormGroupInput,
  FormGroupInputDate,
  FormGroupRadios,
  FormGroupSearchBar,
  FormGroupSelect,
  FormGroupStatic,
  FormGroupTextarea,
  Header,
  Heading,
  HighlightBox,
  HistoryItem,
  Icon,
  IconButton,
  Image,
  ImageOverlay,
  Info,
  InfoButton,
  InputRange,
  JustifyFormGroups,
  Label,
  LabelGroup,
  Legend,
  LegendItem,
  Link,
  LinkList,
  List,
  ListButton,
  Logo,
  MapControls,
  MapLayer,
  MarkBar,
  Modal,
  Navbar,
  OnboardingTip,
  OzonContent,
  Pagination,
  Panel,
  Paragraph,
  PlekinfoCard,
  ProgressIndicator,
  ProjectItem,
  Renvooi,
  ResponsiveElement,
  RichContent,
  RowEqualHeights,
  Scrollable,
  SearchBar,
  Selectable,
  ShoppingCart,
  Skiplink,
  SlideToggle,
  SurveyRating,
  Table,
  Tabs,
  TemplateContainer,
  TijdreisBanner,
  Tile,
  TileGrid,
  Toggletip,
  Tooltip,
  TreeView,
  ViewerGrid,
  // End: named template model imports
} from "dso-toolkit";
import { TemplateResult } from "lit-html";

// Start: import templates
import { coreAccordion } from "./components/accordion/accordion.core-template";
import { coreActionList } from "./components/action-list/action-list.core-template";
import { coreAdvancedSelect } from "./components/advanced-select/advanced-select.core-template";
import { coreAlert } from "./components/alert/alert.core-template";
import { cssAlert } from "./components/alert/alert.css-template";
import { coreAnnotation } from "./components/annotation/annotation.core-template";
import { cssApplicationHeading } from "./components/application-heading/application-heading.css-template";
import { coreAttachmentsCounter } from "./components/attachments-counter/attachments-counter.core-template";
import { cssAttachmentsCounter } from "./components/attachments-counter/attachments-counter.css-template";
import { coreAutosuggest } from "./components/autosuggest/autosuggest.core-template";
import { coreBadge } from "./components/badge/badge.core-template";
import { cssBadge } from "./components/badge/badge.css-template";
import { coreBanner } from "./components/banner/banner.core-template";
import { cssBanner } from "./components/banner/banner.css-template";
import { cssBreadcrumbs } from "./components/breadcrumbs/breadcrumbs.css-template";
import { cssButton } from "./components/button/button.css-template";
import { coreButtonGroup } from "./components/button-group/button-group.core-template";
import { cssButtonRow } from "./components/button-row/button-row.css-template";
import { coreCard } from "./components/card/card.core-template";
import { coreCardContainer } from "./components/card-container/card-container.core-template";
import { cssCardGrid } from "./components/card-grid/card-grid.css-template";
import { cssCardList } from "./components/card-list/card-list.css-template";
import { coreContactInformation } from "./components/contact-information/contact-information.core-template";
import { cssContext } from "./components/context/context.css-template";
import { coreCursorTooltip } from "./components/cursor-tooltip/cursor-tooltip.core-template";
import { coreDatePicker } from "./components/date-picker/date-picker.core-template";
import { cssDefinitionList } from "./components/definition-list/definition-list.css-template";
import { cssDescription } from "./components/description/description.css-template";
import { coreDocumentCard } from "./components/document-card/document-card.core-template";
import { coreDocumentComponent } from "./components/document-component/document-component.core-template";
import { cssDocumentHeader } from "./components/document-header/document-header.css-template";
import { coreDropdownMenu } from "./components/dropdown-menu/dropdown-menu.core-template";
import { cssDropdownMenu } from "./components/dropdown-menu/dropdown-menu.css-template";
import { coreExpandable } from "./components/expandable/expandable.core-template";
import { cssFooter } from "./components/footer/footer.css-template";
import { cssFootnote } from "./components/footnotes/footnote.css-template";
import { cssFootnotes } from "./components/footnotes/footnotes.css-template";
import { cssForm } from "./components/form/form.css-template";
import { cssFormButtons } from "./components/form-buttons/form-buttons.css-template";
import { cssFormGroupCheckboxes } from "./components/form-group/form-group-checkboxes.css-template";
import { cssFormGroupConfirm } from "./components/form-group/form-group-confirm.css-template";
import { cssFormGroupDatePicker } from "./components/form-group/form-group-date-picker.css-template";
import { cssFormGroupFiles } from "./components/form-group/form-group-files.css-template";
import { cssFormGroupInput } from "./components/form-group/form-group-input.css-template";
import { cssFormGroupRadios } from "./components/form-group/form-group-radios.css-template";
import { cssFormGroupSearchBar } from "./components/form-group/form-group-search-bar.css-template";
import { cssFormGroupSelect } from "./components/form-group/form-group-select.css-template";
import { cssFormGroupStatic } from "./components/form-group/form-group-static.css-template";
import { cssFormGroupTextarea } from "./components/form-group/form-group-textarea.css-template";
import { cssFormGroup } from "./components/form-group/form-group.css-template";
import { coreHeader } from "./components/header/header.core-template";
import { cssHeading } from "./components/heading/heading.css-template";
import { coreHighlightBox } from "./components/highlight-box/highlight-box.core-template";
import { cssHighlightBox } from "./components/highlight-box/highlight-box.css-template";
import { coreHistoryItem } from "./components/history-item/history-item.core-template";
import { coreIcon } from "./components/icon/icon.core-template";
import { coreIconButton } from "./components/icon-button/icon-button.core-template";
import { cssImage } from "./components/image/image.css-template";
import { coreImageOverlay } from "./components/image-overlay/image-overlay.core-template";
import { coreInfo } from "./components/info/info.core-template";
import { cssInfo } from "./components/info/info.css-template";
import { coreInfoButton } from "./components/info-button/info-button.core-template";
import { cssInfoButton } from "./components/info-button/info-button.css-template";
import { coreInputRange } from "./components/input-range/input-range.core-template";
import { cssJustifyFormGroups } from "./components/justify-form-groups/justify-form-groups.css-template";
import { coreLabel } from "./components/label/label.core-template";
import { cssLabel } from "./components/label/label.css-template";
import { cssLabelGroup } from "./components/label-group/label-group.css-template";
import { coreLegend } from "./components/legend/legend.core-template";
import { coreLegendItem } from "./components/legend-item/legend-item.core-template";
import { cssLink } from "./components/link/link.css-template";
import { cssLinkList } from "./components/link-list/link-list.css-template";
import { cssList } from "./components/list/list.css-template";
import { coreListButton } from "./components/list-button/list-button.core-template";
import { coreLogo } from "./components/logo/logo.core-template";
import { coreMapControls } from "./components/map-controls/map-controls.core-template";
import { coreMapLayer } from "./components/map-layer/map-layer.core-template";
import { coreMarkBar } from "./components/mark-bar/mark-bar.core-template";
import { coreModal } from "./components/modal/modal.core-template";
import { cssModal } from "./components/modal/modal.css-template";
import { cssNavbar } from "./components/navbar/navbar.css-template";
import { coreOnboardingTip } from "./components/onboarding-tip/onboarding-tip.core-template";
import { coreOzonContent } from "./components/ozon-content/ozon-content.core-template";
import { corePagination } from "./components/pagination/pagination.core-template";
import { corePanel } from "./components/panel/panel.core-template";
import { cssParagraph } from "./components/paragraph/paragraph.css-template";
import { corePlekinfoCard } from "./components/plekinfo-card/plekinfo-card.core-template";
import { coreProgressIndicator } from "./components/progress-indicator/progress-indicator.core-template";
import { coreProjectItem } from "./components/project-item/project-item.core-template";
import { coreRenvooi } from "./components/renvooi/renvooi.core-template";
import { coreResponsiveElement } from "./components/responsive-element/responsive-element.core-template";
import { cssRichContent } from "./components/rich-content/rich-content.css-template";
import { cssRowEqualHeights } from "./components/row-equal-heights/row-equal-heights.css-template";
import { coreScrollable } from "./components/scrollable/scrollable.core-template";
import { cssSearchBar } from "./components/search-bar/search-bar.css-template";
import { coreSelectable } from "./components/selectable/selectable.core-template";
import { cssShoppingCart } from "./components/shopping-cart/shopping-cart.css-template";
import { coreSkiplink } from "./components/skiplink/skiplink.core-template";
import { coreSlideToggle } from "./components/slide-toggle/slide-toggle.core-template";
import { coreSurveyRating } from "./components/survey-rating/survey-rating.core-template";
import { coreTable } from "./components/table/table.core-template";
import { coreTabs } from "./components/tabs/tabs.core-template";
import { coreTijdreisBanner } from "./components/tijdreis-banner/tijdreis-banner.core-template";
import { cssTile } from "./components/tile/tile.css-template";
import { cssTileGrid } from "./components/tile-grid/tile-grid.css-template";
import { coreToggletip } from "./components/toggletip/toggletip.core-template";
import { coreTooltip } from "./components/tooltip/tooltip.core-template";
import { coreTreeView } from "./components/tree-view/tree-view.core-template";
import { coreViewerGrid } from "./components/viewer-grid/viewer-grid.core-template";

// End: import templates

export interface Components {
  // Start: Components interface
  accordion: Accordion<TemplateResult>;
  actionList: ActionList<TemplateResult>;
  advancedSelect: AdvancedSelect<unknown>;
  alert: Alert<TemplateResult>;
  annotation: Annotation;
  applicationHeading: ApplicationHeading;
  attachmentsCounter: AttachmentsCounter;
  autosuggest: Autosuggest<TemplateResult>;
  badge: Badge;
  banner: Banner<TemplateResult>;
  breadcrumbs: Breadcrumbs;
  button: Button | ButtonAnchor;
  buttonGroup: ButtonGroup;
  buttonRow: ButtonRow;
  card: Card<TemplateResult>;
  cardContainer: CardContainer<TemplateResult>;
  cardGrid: CardGrid<TemplateResult>;
  cardList: CardList<TemplateResult>;
  contactInformation: ContactInformation<TemplateResult | string>;
  context: Context<TemplateResult>;
  cursorTooltip: CursorTooltip;
  datePicker: DatePicker;
  definitionList: DefinitionList<TemplateResult>;
  description: Description;
  documentCard: DocumentCard<TemplateResult>;
  documentComponent: DocumentComponent<TemplateResult>;
  documentHeader: DocumentHeader<TemplateResult>;
  dropdownMenu: DropdownMenu;
  expandable: Expandable<TemplateResult>;
  footer: Footer<TemplateResult>;
  footnote: Footnote;
  footnotes: Footnote[];
  form: Form<TemplateResult>;
  formButtons: FormButtons;
  formGroup: FormGroup<TemplateResult>;
  formGroupCheckboxes: FormGroupCheckboxes<TemplateResult>;
  formGroupConfirm: FormGroupConfirm<TemplateResult>;
  formGroupDatePicker: FormGroupDatePicker<TemplateResult>;
  formGroupFiles: FormGroupFiles<TemplateResult>;
  formGroupInput: FormGroupInput<TemplateResult> | FormGroupInputDate<TemplateResult>;
  formGroupRadios: FormGroupRadios<TemplateResult>;
  formGroupSearchBar: FormGroupSearchBar<TemplateResult>;
  formGroupSelect: FormGroupSelect<TemplateResult>;
  formGroupStatic: FormGroupStatic<TemplateResult>;
  formGroupTextarea: FormGroupTextarea<TemplateResult>;
  header: Header;
  heading: Heading<TemplateResult>;
  highlightBox: HighlightBox<TemplateResult | string>;
  historyItem: HistoryItem;
  icon: Icon;
  iconButton: IconButton;
  image: Image;
  imageOverlay: ImageOverlay;
  info: Info<TemplateResult>;
  infoButton: InfoButton;
  inputRange: InputRange;
  justifyFormGroups: JustifyFormGroups<TemplateResult>;
  label: Label;
  labelGroup: LabelGroup;
  legend: Legend<TemplateResult>;
  legendItem: LegendItem<TemplateResult>;
  link: Link;
  linkList: LinkList;
  list: List;
  listButton: ListButton;
  logo: Logo;
  mapControls: MapControls;
  mapLayer: MapLayer<TemplateResult>;
  markBar: MarkBar;
  modal: Modal<TemplateResult>;
  navbar: Navbar<TemplateResult>;
  onboardingTip: OnboardingTip<TemplateResult>;
  ozonContent: OzonContent;
  pagination: Pagination;
  panel: Panel<TemplateResult>;
  paragraph: Paragraph;
  plekinfoCard: PlekinfoCard<TemplateResult>;
  progressIndicator: ProgressIndicator;
  projectItem: ProjectItem<TemplateResult | string>;
  renvooi: Renvooi;
  responsiveElement: ResponsiveElement<TemplateResult>;
  richContent: RichContent<TemplateResult>;
  rowEqualHeights: RowEqualHeights<TemplateResult>;
  scrollable: Scrollable<TemplateResult>;
  searchBar: SearchBar;
  selectable: Selectable<TemplateResult>;
  shoppingCart: ShoppingCart;
  skiplink: Skiplink;
  slideToggle: SlideToggle;
  surveyRating: SurveyRating;
  table: Table<TemplateResult>;
  tabs: Tabs<TemplateResult>;
  tijdreisBanner: TijdreisBanner;
  tile: Tile;
  tileGrid: TileGrid;
  toggletip: Toggletip<TemplateResult>;
  tooltip: Tooltip;
  treeView: TreeView;
  viewerGrid: ViewerGrid<TemplateResult>;
  // End: Components interface
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
  getNameByTitle: (title: string): string | undefined => {
    if (title.startsWith("HTML|CSS")) {
      return "html-css";
    }

    if (title.startsWith("Core")) {
      return "core";
    }

    return undefined;
  },
});

// Start: add templates to container
templateContainer.add(coreAccordion);
templateContainer.add(coreActionList);
templateContainer.add(coreAdvancedSelect);
templateContainer.add(coreAlert);
templateContainer.add(coreAnnotation);
templateContainer.add(coreAttachmentsCounter);
templateContainer.add(coreAutosuggest);
templateContainer.add(coreBadge);
templateContainer.add(coreBanner);
templateContainer.add(coreButtonGroup);
templateContainer.add(coreCard);
templateContainer.add(coreCardContainer);
templateContainer.add(coreContactInformation);
templateContainer.add(coreDatePicker);
templateContainer.add(coreDocumentCard);
templateContainer.add(coreDocumentComponent);
templateContainer.add(coreDropdownMenu);
templateContainer.add(coreExpandable);
templateContainer.add(coreHeader);
templateContainer.add(coreHighlightBox);
templateContainer.add(coreHistoryItem);
templateContainer.add(coreIcon);
templateContainer.add(coreIconButton);
templateContainer.add(coreImageOverlay);
templateContainer.add(coreInfo);
templateContainer.add(coreInfoButton);
templateContainer.add(coreInputRange);
templateContainer.add(coreLabel);
templateContainer.add(coreLegend);
templateContainer.add(coreLegendItem);
templateContainer.add(coreListButton);
templateContainer.add(coreLogo);
templateContainer.add(coreMapControls);
templateContainer.add(coreMapLayer);
templateContainer.add(coreMarkBar);
templateContainer.add(coreModal);
templateContainer.add(coreOnboardingTip);
templateContainer.add(coreOzonContent);
templateContainer.add(corePagination);
templateContainer.add(corePanel);
templateContainer.add(corePlekinfoCard);
templateContainer.add(coreProgressIndicator);
templateContainer.add(coreProjectItem);
templateContainer.add(coreRenvooi);
templateContainer.add(coreResponsiveElement);
templateContainer.add(coreScrollable);
templateContainer.add(coreSelectable);
templateContainer.add(coreSkiplink);
templateContainer.add(coreSlideToggle);
templateContainer.add(coreSurveyRating);
templateContainer.add(coreTable);
templateContainer.add(coreTabs);
templateContainer.add(coreTijdreisBanner);
templateContainer.add(coreToggletip);
templateContainer.add(coreTooltip);
templateContainer.add(coreTreeView);
templateContainer.add(coreViewerGrid);
templateContainer.add(cssAlert);
templateContainer.add(cssApplicationHeading);
templateContainer.add(cssAttachmentsCounter);
templateContainer.add(cssBadge);
templateContainer.add(cssBanner);
templateContainer.add(cssBreadcrumbs);
templateContainer.add(cssButton);
templateContainer.add(cssButtonRow);
templateContainer.add(cssCardGrid);
templateContainer.add(cssCardList);
templateContainer.add(cssContext);
templateContainer.add(cssDefinitionList);
templateContainer.add(cssDescription);
templateContainer.add(cssDocumentHeader);
templateContainer.add(cssDropdownMenu);
templateContainer.add(cssFooter);
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
templateContainer.add(cssFormGroupRadios);
templateContainer.add(cssFormGroupSearchBar);
templateContainer.add(cssFormGroupSelect);
templateContainer.add(cssFormGroupStatic);
templateContainer.add(cssFormGroupTextarea);
templateContainer.add(cssHeading);
templateContainer.add(cssHighlightBox);
templateContainer.add(cssImage);
templateContainer.add(cssInfo);
templateContainer.add(cssInfoButton);
templateContainer.add(cssJustifyFormGroups);
templateContainer.add(cssLabel);
templateContainer.add(cssLabelGroup);
templateContainer.add(cssLink);
templateContainer.add(cssLinkList);
templateContainer.add(cssList);
templateContainer.add(cssModal);
templateContainer.add(cssNavbar);
templateContainer.add(cssParagraph);
templateContainer.add(cssRichContent);
templateContainer.add(cssRowEqualHeights);
templateContainer.add(cssSearchBar);
templateContainer.add(cssShoppingCart);
templateContainer.add(cssTile);
templateContainer.add(cssTileGrid);
templateContainer.add(coreCursorTooltip);
// End: add templates to container
