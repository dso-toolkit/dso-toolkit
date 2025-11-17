import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  Fragment,
  Host,
  Prop,
  State,
  Watch,
  forceUpdate,
  h,
} from "@stencil/core";
import { clsx } from "clsx";

import { i18n } from "../../utils/i18n";
import { isModifiedEvent } from "../../utils/is-modified-event";

import { translations } from "./header.i18n";
import {
  HeaderAuthStatus,
  HeaderCompactMode,
  HeaderEvent,
  HeaderMenuItem,
  HeaderNavigationType,
} from "./header.interfaces";
import { MenuItem } from "./menu-item.functional-component";

const minDesktopViewportWidth = 992;

interface ClickHandlerOptions {
  menuItem?: HeaderMenuItem;
  url?: string;
}

@Component({
  tag: "dso-header",
  styleUrl: "header.scss",
  shadow: true,
})
export class Header implements ComponentInterface {
  @Element()
  host!: HTMLDsoHeaderElement;

  /**
   * The main menu items.
   */
  @Prop()
  mainMenu: HeaderMenuItem[] = [];

  /**
   * Set to "always" to force the header to be compact. Otherwise it will be compact when
   * the viewport is smaller than 992px.
   */
  @Prop()
  compact: HeaderCompactMode = "auto";

  /**
   * Used to show the login/logout option. 'none' renders nothing.
   */
  @Prop()
  authStatus: HeaderAuthStatus = "none";

  /**
   * When the `authStatus` is `loggedOut` a loginUrl can be provided.
   * The login button will then render as an anchor.
   */
  @Prop()
  loginUrl?: string;

  /**
   * The URL to open when the user activates "logout".
   * If no URL is specified, a button element is used instead.
   */
  @Prop()
  logoutUrl?: string;

  /**
   * Show a help-button or link in the header
   */
  @Prop()
  showHelp = false;

  /**
   * The URL to open when the user activates "help".
   * If no URL is specified, a button element is used instead.
   */
  @Prop()
  helpUrl?: string;

  /**
   * The name to show when the user is logged in.
   */
  @Prop()
  userProfileName?: string;

  /**
   * The URL to open when the user activates the profile url.
   */
  @Prop()
  userProfileUrl?: string;

  /**
   * The URL to open when the user activates "Mijn Omgevingsloket".
   */
  @Prop()
  userHomeUrl?: string;

  /**
   * Set this to true when the user is at "Mijn Omgevingsloket".
   */
  @Prop()
  userHomeActive = false;

  /**
   * Emitted when something in the header is selected.
   *
   * `event.detail.type` indicates the functionality the user pressed. eg. `'login'` or `'menuItem'`
   */
  @Event()
  dsoHeaderClick!: EventEmitter<HeaderEvent>;

  @State()
  visibleMenuItemsCount: number | undefined = undefined;

  @State()
  dropdownOptionsOffset = 0;

  @Watch("mainMenu")
  mainMenuChanged() {
    this.resetVisibleMenuItems();
  }

  private resetVisibleMenuItems = () => {
    this.visibleMenuItemsCount = undefined;
  };

  private get isCompact() {
    return this.compact === "always" || window.innerWidth < minDesktopViewportWidth;
  }

  private clickHandler = (e: MouseEvent, type: HeaderNavigationType, options?: ClickHandlerOptions) => {
    this.dsoHeaderClick.emit({
      originalEvent: e,
      isModifiedEvent: isModifiedEvent(e),
      type,
      menuItem: options?.menuItem,
      url: options?.url ?? options?.menuItem?.url,
    });
  };

  private dropdownElement: HTMLDsoDropdownMenuElement | undefined;
  private navElement: HTMLUListElement | undefined;
  private menuItemElementRefs: (HTMLLIElement | undefined)[] = [];
  private dropdownMenuItemElementRef: HTMLLIElement | undefined;
  private userHomeMenuItemElementRef: HTMLLIElement | undefined;

  private text = i18n(() => this.host, translations);

  /**
   * Before determining the visible menu items, all the menu items are rendered (including the dropdown menu item and the user home menu item).
   * Then the visible menu items are calculated in componentDidRender() and ONLY when the visibleMenuItemsCount is undefined.
   *
   * When the window resizes or this.mainMenu changes, a reset is triggered to recalculate the visible menu items.
   *
   * @param navElement The navigation element to calculate the overflow menu item count for.
   * @returns The number of menu items that can fit in the available space.
   */
  private calculateOverflowMenuItemCount(navElement: HTMLUListElement): number {
    const availableWidth = navElement.offsetWidth;

    const lastMenuItem = this.menuItemElementRefs[this.menuItemElementRefs.length - 1];
    const mostRightMenuItem = this.userHomeMenuItemElementRef ?? lastMenuItem;
    const dropdownMenuItem = this.dropdownMenuItemElementRef;

    if (!mostRightMenuItem || !dropdownMenuItem || !lastMenuItem) {
      return this.menuItemElementRefs.length;
    }

    const dropdownMenuItemEffectiveWidth =
      dropdownMenuItem.offsetLeft + dropdownMenuItem.offsetWidth - (lastMenuItem.offsetLeft + lastMenuItem.offsetWidth);

    const requiredWidth = mostRightMenuItem.offsetLeft + mostRightMenuItem.offsetWidth - dropdownMenuItemEffectiveWidth;

    if (requiredWidth <= availableWidth) {
      return this.menuItemElementRefs.length;
    }

    const userHomeMenuItemEffectiveWidth = this.userHomeMenuItemElementRef
      ? this.userHomeMenuItemElementRef.offsetLeft +
        this.userHomeMenuItemElementRef.offsetWidth -
        (dropdownMenuItem.offsetLeft + dropdownMenuItem.offsetWidth)
      : 0;

    const remainingWidth = availableWidth - dropdownMenuItemEffectiveWidth - userHomeMenuItemEffectiveWidth;

    const visibleMenuItems = this.menuItemElementRefs.findIndex(
      (menuItem) => menuItem && menuItem.offsetLeft + menuItem.offsetWidth > remainingWidth,
    );

    if (visibleMenuItems < 0) {
      return this.menuItemElementRefs.length;
    }

    return visibleMenuItems;
  }

  private calculateDropdownOptionsOffset() {
    if (!this.dropdownElement) {
      return 0;
    }

    return (
      this.host.clientHeight -
      (this.dropdownElement?.getBoundingClientRect().bottom - this.host.getBoundingClientRect().top)
    );
  }

  private get visibleMainMenuItems(): HeaderMenuItem[] {
    return typeof this.visibleMenuItemsCount === "number"
      ? this.mainMenu.slice(0, this.visibleMenuItemsCount)
      : this.mainMenu;
  }

  private get hiddenMainMenuItems(): HeaderMenuItem[] {
    return typeof this.visibleMenuItemsCount === "number" ? this.mainMenu.slice(this.visibleMenuItemsCount) : [];
  }

  private resizeObserver = new ResizeObserver(() => {
    this.resetVisibleMenuItems();

    forceUpdate(this.host);
  });

  connectedCallback(): void {
    this.resizeObserver.observe(this.host);
  }

  disconnectedCallback() {
    this.resizeObserver.disconnect();
  }

  componentDidRender() {
    if (!this.host.isConnected) {
      return;
    }

    if (this.isCompact && this.dropdownElement) {
      this.dropdownElement.dropdownOptionsOffset = this.calculateDropdownOptionsOffset();
    }

    if (typeof this.visibleMenuItemsCount === "undefined" && this.navElement) {
      this.visibleMenuItemsCount = this.calculateOverflowMenuItemCount(this.navElement);
    }
  }

  render() {
    return (
      <Host is-compact={this.isCompact}>
        <div class="dso-header">
          <div class="logo-container">
            <slot name="logo" />
          </div>
          {this.isCompact ? this.renderCompact() : this.renderNormal()}
        </div>
      </Host>
    );
  }

  private renderCompact() {
    return (
      (this.mainMenu.length > 0 || this.userHomeUrl || this.authStatus !== "none") && (
        <div class="dropdown">
          <dso-dropdown-menu
            dropdown-align="right"
            dropdownOptionsOffset={this.dropdownOptionsOffset}
            ref={(element) => (this.dropdownElement = element)}
          >
            <button type="button" slot="toggle">
              <span>{this.text("menu")}</span>
              <dso-icon icon="chevron-down"></dso-icon>
            </button>
            <div class="dso-dropdown-options">
              <ul>
                {this.mainMenu.map((menuItem) => (
                  <MenuItem
                    item={menuItem}
                    onClick={(e) => this.clickHandler(e, "menuItem", { menuItem })}
                    key={menuItem.label}
                  />
                ))}
                {this.userHomeUrl && (
                  <li>
                    <a
                      href={this.userHomeUrl}
                      onClick={(e) => this.clickHandler(e, "userHome", { url: this.userHomeUrl })}
                    >
                      {this.text("userHome")}
                    </a>
                  </li>
                )}
                {this.userProfileUrl && this.userProfileName && this.authStatus === "loggedIn" && (
                  <li>
                    <a
                      href={this.userProfileUrl}
                      onClick={(e) => this.clickHandler(e, "profile", { url: this.userProfileUrl })}
                    >
                      {this.userProfileName}
                      <span class="profile-label"> - Mijn profiel</span>
                    </a>
                  </li>
                )}
                {this.authStatus === "loggedOut" && (
                  <li>
                    {this.loginUrl ? (
                      <a href={this.loginUrl} onClick={(e) => this.clickHandler(e, "login", { url: this.loginUrl })}>
                        {this.text("login")}
                      </a>
                    ) : (
                      <button type="button" onClick={(e) => this.clickHandler(e, "login")}>
                        {this.text("login")}
                      </button>
                    )}
                  </li>
                )}
                {this.authStatus === "loggedIn" && (
                  <li>
                    {this.logoutUrl ? (
                      <a href={this.logoutUrl} onClick={(e) => this.clickHandler(e, "logout", { url: this.logoutUrl })}>
                        {this.text("logout")}
                      </a>
                    ) : (
                      <button type="button" onClick={(e) => this.clickHandler(e, "logout")}>
                        {this.text("logout")}
                      </button>
                    )}
                  </li>
                )}
                {this.showHelp && (
                  <li>
                    {this.helpUrl ? (
                      <a
                        href={this.helpUrl}
                        class="dso-tertiary"
                        onClick={(e) => this.clickHandler(e, "help", { url: this.helpUrl })}
                      >
                        <span>{this.text("help")}</span>
                        <dso-icon icon="help"></dso-icon>
                      </a>
                    ) : (
                      <button type="button" class="dso-tertiary" onClick={(e) => this.clickHandler(e, "help")}>
                        <span>{this.text("help")}</span>
                        <dso-icon icon="help"></dso-icon>
                      </button>
                    )}
                  </li>
                )}
              </ul>
            </div>
          </dso-dropdown-menu>
        </div>
      )
    );
  }

  private renderNormal() {
    this.menuItemElementRefs = [];

    return (
      <Fragment>
        <div class="dso-header-session">
          {this.userProfileUrl && this.userProfileName && this.authStatus === "loggedIn" && (
            <div class="profile">
              <a
                href={this.userProfileUrl}
                class="dso-tertiary"
                onClick={(e) => this.clickHandler(e, "profile", { url: this.userProfileUrl })}
              >
                {this.userProfileName}
              </a>
            </div>
          )}
          {this.authStatus === "loggedOut" && (
            <div class="login">
              {this.loginUrl ? (
                <a
                  href={this.loginUrl}
                  class="dso-tertiary"
                  onClick={(e) => this.clickHandler(e, "login", { url: this.loginUrl })}
                >
                  {this.text("login")}
                </a>
              ) : (
                <button class="dso-tertiary" type="button" onClick={(e) => this.clickHandler(e, "login")}>
                  {this.text("login")}
                </button>
              )}
            </div>
          )}
          {this.authStatus === "loggedIn" && (
            <div class="logout">
              {this.logoutUrl ? (
                <a
                  href={this.logoutUrl}
                  class="dso-tertiary"
                  onClick={(e) => this.clickHandler(e, "logout", { url: this.logoutUrl })}
                >
                  {this.text("logout")}
                </a>
              ) : (
                <button class="dso-tertiary" type="button" onClick={(e) => this.clickHandler(e, "logout")}>
                  {this.text("logout")}
                </button>
              )}
            </div>
          )}
          {this.showHelp && (
            <div class="help">
              {this.helpUrl ? (
                <a
                  href={this.helpUrl}
                  class="dso-tertiary"
                  onClick={(e) => this.clickHandler(e, "help", { url: this.helpUrl })}
                >
                  <span>{this.text("help")}</span>
                  <dso-icon icon="help"></dso-icon>
                </a>
              ) : (
                <button class="dso-tertiary" type="button" onClick={(e) => this.clickHandler(e, "help")}>
                  <span>{this.text("help")}</span>
                  <dso-icon icon="help"></dso-icon>
                </button>
              )}
            </div>
          )}
        </div>
        {(this.mainMenu.length > 0 || this.userHomeUrl) && (
          <nav class="dso-navbar">
            <ul
              class={clsx("dso-nav", "dso-nav-main", { ready: this.visibleMenuItemsCount !== undefined })}
              ref={(element) => (this.navElement = element)}
            >
              {this.visibleMainMenuItems.map((menuItem, i) => (
                <MenuItem
                  item={menuItem}
                  onClick={(e) => this.clickHandler(e, "menuItem", { menuItem })}
                  key={menuItem.label}
                  ref={(el) => (this.menuItemElementRefs[i] = el)}
                />
              ))}
              {(this.visibleMenuItemsCount === undefined || this.hiddenMainMenuItems.length > 0) && (
                <li
                  aria-hidden={this.visibleMenuItemsCount === undefined}
                  ref={(el) => (this.dropdownMenuItemElementRef = el)}
                  class="dropdown-menu-item"
                >
                  <dso-dropdown-menu>
                    <button type="button" slot="toggle">
                      <span>{this.text("overflowMenu")}</span>
                      <dso-icon icon="chevron-down" class="main-menu-item-icon"></dso-icon>
                    </button>
                    <div class="dso-dropdown-options">
                      <ul>
                        {this.hiddenMainMenuItems.map((menuItem) => (
                          <MenuItem
                            item={menuItem}
                            onClick={(e) => this.clickHandler(e, "menuItem", { menuItem })}
                            key={menuItem.label}
                          />
                        ))}
                      </ul>
                    </div>
                  </dso-dropdown-menu>
                </li>
              )}
              {this.userHomeUrl && (
                <li
                  class={clsx("menu-user-home", { "dso-active": this.userHomeActive })}
                  ref={(el) => (this.userHomeMenuItemElementRef = el)}
                >
                  <a
                    href={this.userHomeUrl}
                    aria-current={this.userHomeActive ? "page" : undefined}
                    onClick={(e) => this.clickHandler(e, "userHome", { url: this.userHomeUrl })}
                  >
                    <dso-icon icon="user-line" class="main-menu-item-icon"></dso-icon>
                    {this.text("userHome")}
                  </a>
                </li>
              )}
            </ul>
          </nav>
        )}
      </Fragment>
    );
  }
}
