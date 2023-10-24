import { Component, Element, Event, EventEmitter, Fragment, h, Prop, State, Watch } from "@stencil/core";

import clsx from "clsx";
import debounce from "debounce";
import { isModifiedEvent } from "../../utils/is-modified-event";

import { HeaderMenuItem, HeaderNavigationType, HeaderEvent } from "./header.interfaces";

const minDesktopViewportWidth = 992;

@Component({
  tag: "dso-header",
  styleUrl: "header.scss",
  scoped: true,
})
export class Header {
  private clickHandler(
    e: MouseEvent,
    type: HeaderNavigationType,
    options?: { menuItem?: HeaderMenuItem; url?: string }
  ) {
    this.dsoHeaderClick.emit({
      originalEvent: e,
      isModifiedEvent: isModifiedEvent(e),
      type,
      menuItem: options?.menuItem,
      url: options?.url ?? options?.menuItem?.url,
    });
  }

  private dropdownElement?: HTMLElement;

  @Element()
  host!: HTMLDsoHeaderElement;

  /**
   * The main menu items.
   */
  @Prop()
  mainMenu?: HeaderMenuItem[] = [];

  /**
   * Either have the dropdown menu appear automatically or always.
   */
  @Prop()
  useDropDownMenu: "always" | "auto" = "auto";

  /**
   * Used to show the login/logout option. 'none' renders nothing.
   */
  @Prop()
  authStatus: "none" | "loggedIn" | "loggedOut" = "none";

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
  userHomeActive?: boolean;

  @State()
  showDropDown?: boolean;

  @State()
  overflowMenuItems = 0;

  @State()
  dropdownOptionsOffset = 0;

  /**
   * Emitted when something in the header is selected.
   *
   * `event.detail.type` indicates the functionality the user pressed. eg. `'login'` or `'menuItem'`
   */
  @Event()
  dsoHeaderClick!: EventEmitter<HeaderEvent>;

  @Watch("useDropDownMenu")
  setShowDropDown(value: "always" | "auto") {
    if (value === "auto") {
      this.setDropDownMenu();

      return;
    }

    this.showDropDown = value === "always";
  }

  private wrapper: HTMLDivElement | undefined;

  private nav: HTMLUListElement | undefined;

  private shrinkMenuToFit() {
    if (!this.wrapper || !this.nav) {
      return;
    }

    if (this.wrapper.clientWidth >= this.nav.clientWidth) {
      return;
    }

    if (this.mainMenu && this.overflowMenuItems >= this.mainMenu.length) {
      return;
    }

    this.overflowMenuItems++;
  }

  componentDidRender() {
    if (this.showDropDown) {
      this.dropdownOptionsOffset = this.calculateDropdownOptionsOffset();

      return;
    }

    window.setTimeout(() => this.shrinkMenuToFit(), 0);
  }

  componentDidLoad() {
    this.setShowDropDown(this.useDropDownMenu);

    if (this.showDropDown) {
      this.dropdownOptionsOffset = this.calculateDropdownOptionsOffset();
    }
  }

  private setOverflowMenu() {
    if (this.showDropDown) {
      return;
    }

    if (this.overflowMenuItems !== 0) {
      this.overflowMenuItems = 0;
      return;
    }

    this.shrinkMenuToFit();
  }

  private setDropDownMenu() {
    if (this.useDropDownMenu !== "auto") {
      return;
    }

    this.showDropDown = window.innerWidth < minDesktopViewportWidth;
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

  private onWindowResize = debounce(() => {
    this.dropdownElement?.removeAttribute("open");
    this.dropdownElement?.removeAttribute("tabindex");

    this.setDropDownMenu();
    this.setOverflowMenu();

    if (this.showDropDown) {
      this.dropdownOptionsOffset = this.calculateDropdownOptionsOffset();
    }
  }, 100);

  connectedCallback() {
    window.addEventListener("resize", this.onWindowResize);
  }

  disconnectedCallback() {
    window.removeEventListener("resize", this.onWindowResize);
  }

  private MenuItem = (item: HeaderMenuItem) => {
    return (
      <li class={item.active ? "dso-active" : undefined}>
        <a
          href={item.url}
          aria-current={item.active ? "page" : undefined}
          onClick={(e) => this.clickHandler(e, "menuItem", { menuItem: item })}
        >
          {item.label}
        </a>
      </li>
    );
  };

  render() {
    // Prevent 'flickering' when useDropDownMenu = 'always'
    if (this.showDropDown === undefined) {
      return;
    }

    return (
      <>
        <div
          class={clsx("dso-header", {
            ["use-drop-down"]: this.showDropDown,
          })}
          ref={(element) => (this.wrapper = element)}
        >
          <div class="logo-container">
            <slot name="logo" />
          </div>
          {this.showDropDown &&
            this.mainMenu &&
            (this.mainMenu.length > 0 || this.userHomeUrl || this.authStatus !== "none") && (
              <div class="dropdown">
                <dso-dropdown-menu
                  dropdown-align="right"
                  strategy="absolute"
                  dropdownOptionsOffset={this.dropdownOptionsOffset}
                  ref={(element) => (this.dropdownElement = element)}
                >
                  <button type="button" slot="toggle">
                    <span>Menu</span>
                  </button>
                  <div class="dso-dropdown-options">
                    <ul>
                      {this.mainMenu.map(this.MenuItem)}
                      {this.userHomeUrl && (
                        <li>
                          <a
                            href={this.userHomeUrl}
                            onClick={(e) => this.clickHandler(e, "userHome", { url: this.userHomeUrl })}
                          >
                            Mijn Omgevingsloket
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
                            <a
                              href={this.loginUrl}
                              onClick={(e) => this.clickHandler(e, "login", { url: this.loginUrl })}
                            >
                              Inloggen
                            </a>
                          ) : (
                            <button type="button" onClick={(e) => this.clickHandler(e, "login")}>
                              Inloggen
                            </button>
                          )}
                        </li>
                      )}
                      {this.authStatus === "loggedIn" && (
                        <li>
                          {this.logoutUrl ? (
                            <a
                              href={this.logoutUrl}
                              onClick={(e) => this.clickHandler(e, "logout", { url: this.logoutUrl })}
                            >
                              Uitloggen
                            </a>
                          ) : (
                            <button type="button" onClick={(e) => this.clickHandler(e, "logout")}>
                              Uitloggen
                            </button>
                          )}
                        </li>
                      )}
                      <li>
                        {this.helpUrl ? (
                          <a href={this.helpUrl} onClick={(e) => this.clickHandler(e, "help", { url: this.helpUrl })}>
                            <span>Help</span>
                            <dso-icon icon="help"></dso-icon>
                          </a>
                        ) : (
                          <button type="button" onClick={(e) => this.clickHandler(e, "help")}>
                            <span>Help</span>
                            <dso-icon icon="help"></dso-icon>
                          </button>
                        )}
                      </li>
                    </ul>
                  </div>
                </dso-dropdown-menu>
              </div>
            )}
          {!this.showDropDown && (
            <>
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
                        Inloggen
                      </a>
                    ) : (
                      <button class="dso-tertiary" type="button" onClick={(e) => this.clickHandler(e, "login")}>
                        Inloggen
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
                        Uitloggen
                      </a>
                    ) : (
                      <button class="dso-tertiary" type="button" onClick={(e) => this.clickHandler(e, "logout")}>
                        Uitloggen
                      </button>
                    )}
                  </div>
                )}
                <div class="help">
                  {this.helpUrl ? (
                    <a
                      href={this.helpUrl}
                      class="dso-tertiary"
                      onClick={(e) => this.clickHandler(e, "help", { url: this.helpUrl })}
                    >
                      <span>Help</span>
                      <dso-icon icon="help"></dso-icon>
                    </a>
                  ) : (
                    <button class="dso-tertiary" type="button" onClick={(e) => this.clickHandler(e, "help")}>
                      <span>Help</span>
                      <dso-icon icon="help"></dso-icon>
                    </button>
                  )}
                </div>
              </div>
              {((this.mainMenu && this.mainMenu.length > 0) || this.userHomeUrl) && (
                <nav class="dso-navbar">
                  <ul class="dso-nav dso-nav-main" ref={(element) => (this.nav = element)}>
                    {this.mainMenu &&
                      this.mainMenu
                        .filter((_, index) => this.mainMenu && index < this.mainMenu.length - this.overflowMenuItems)
                        .map(this.MenuItem)}
                    {this.overflowMenuItems > 0 && (
                      <li>
                        <dso-dropdown-menu placement="bottom">
                          <button type="button" slot="toggle">
                            <span>Meer</span>
                          </button>
                          <div class="dso-dropdown-options">
                            <ul>
                              {this.mainMenu &&
                                this.mainMenu
                                  .filter(
                                    (_, index) =>
                                      this.mainMenu && index >= this.mainMenu.length - this.overflowMenuItems
                                  )
                                  .map(this.MenuItem)}
                            </ul>
                          </div>
                        </dso-dropdown-menu>
                      </li>
                    )}
                    {this.userHomeUrl && (
                      <li class={clsx("menu-user-home", { "dso-active": this.userHomeActive })}>
                        <a
                          href={this.userHomeUrl}
                          aria-current={this.userHomeActive ? "page" : undefined}
                          onClick={(e) => this.clickHandler(e, "userHome", { url: this.userHomeUrl })}
                        >
                          <dso-icon icon="user-line"></dso-icon>
                          Mijn Omgevingsloket
                        </a>
                      </li>
                    )}
                  </ul>
                </nav>
              )}
            </>
          )}
        </div>
      </>
    );
  }
}
