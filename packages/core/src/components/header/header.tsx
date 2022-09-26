import {
  Component,
  Element,
  Event,
  EventEmitter,
  Fragment,
  h,
  Prop,
  State,
  Watch,
} from "@stencil/core";

import clsx from "clsx";
import debounce from "debounce";

import { HeaderMenuItem, HeaderNavigationType, HeaderClickEvent, HeaderClickMenuItemEvent } from './header.interfaces';

const minDesktopViewportWidth = 992;

@Component({
  tag: "dso-header",
  styleUrl: "header.scss",
  scoped: true
})
export class Header {
  private clickHandler(e: MouseEvent, type: HeaderNavigationType, options?: { menuItem?: HeaderMenuItem; url?: string; }) {
    this.dsoHeaderClick.emit({
      originalEvent: e,
      isModifiedEvent: e.button !== 0 || e.ctrlKey || e.shiftKey || e.altKey || e.metaKey,
      type,
      menuItem: options?.menuItem,
      url: options?.url ?? options?.menuItem?.url,
    });
  };

  @Element()
  host!: HTMLElement;

  @Prop()
  mainMenu?: HeaderMenuItem[] = [];

  @Prop()
  useDropDownMenu: "always" | "never" | "auto" = "auto";

  /** Used to show the login/logout option. 'none' renders nothing. */
  @Prop()
  authStatus: 'none' | 'loggedIn' | 'loggedOut' = 'none';

  /** When the `authStatus` is `loggedOut` a loginUrl can be provided, the login button will render as an anchor. */
  @Prop()
  loginUrl?: string;

  @Prop()
  logoutUrl?: string;

  @Prop()
  userProfileName?: string;

  @Prop()
  userProfileUrl?: string;

  @Prop()
  userHomeUrl?: string;

  @State()
  showDropDown?: boolean;

  @State()
  hasSubLogo: boolean = false;

  @State()
  overflowMenuItems: number = 0;

  /**
   * Emitted when something in the header is selected.
   *
   * `event.detail.type` indicates the functionality the user pressed. eg. `'login'` or `'menuItem'`
   */
  @Event()
  dsoHeaderClick!: EventEmitter<HeaderClickEvent | HeaderClickMenuItemEvent>;

  @Watch("useDropDownMenu")
  setShowDropDown(value: "always" | "never" | "auto") {
    if (value === "auto") {
      this.setDropDownMenu();
      return;
    }

    this.showDropDown = value === "always";
  }

  wrapper: HTMLDivElement | undefined;

  nav: HTMLUListElement | undefined;

  componentWillLoad() {
    this.hasSubLogo = this.host.querySelector("*[slot = 'sub-logo']") !== null;
  }

  shrinkMenuToFit() {
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
      return;
    }

    window.setTimeout(() => this.shrinkMenuToFit(), 0);
  }

  componentDidLoad() {
    this.setShowDropDown(this.useDropDownMenu);
  }

  setOverflowMenu() {
    if (this.showDropDown) {
      return;
    }

    if (this.overflowMenuItems != 0) {
      this.overflowMenuItems = 0;
      return;
    }

    this.shrinkMenuToFit();
  }

  setDropDownMenu() {
    if (this.useDropDownMenu !== "auto") {
      return;
    }

    this.showDropDown = window.innerWidth < minDesktopViewportWidth;
  }

  onWindowResize = debounce(() => {
    this.setDropDownMenu();
    this.setOverflowMenu();
  }, 100);

  connectedCallback() {
    window.addEventListener("resize", this.onWindowResize);
  }

  disconnectedCallback() {
    window.removeEventListener("resize", this.onWindowResize);
  }

  MenuItem = (item: HeaderMenuItem) => {
    return (
      <li class={item.active ? "dso-active" : undefined}>
        <a
          href={item.url}
          aria-current={item.active ? "page" : undefined}
          onClick={e => this.clickHandler(e, 'menuItem', { menuItem: item })}
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
            ["has-sub-logo"]: this.hasSubLogo,
          })}
          ref={(element) => (this.wrapper = element)}
        >
          <div class="logo-container">
            <div class="logo">
              <slot name="logo" />
            </div>
            <div class="sub-logo">
              <slot name="sub-logo" />
            </div>
          </div>
          {this.showDropDown && this.mainMenu && this.mainMenu.length > 0 && (
            <div class="dropdown">
              <dso-dropdown-menu dropdown-align="right">
                <button type="button" slot="toggle">
                  <span>Menu</span>
                </button>
                <div class="dso-dropdown-options">
                  <ul>
                    {this.mainMenu.map(this.MenuItem)}
                    {this.userHomeUrl && (
                      <li>
                        <a href={this.userHomeUrl} onClick={e => this.clickHandler(e, 'userHome', { url: this.userHomeUrl})}>Mijn Omgevingsloket</a>
                      </li>
                    )}
                    {this.userProfileUrl &&
                      this.userProfileName &&
                      this.authStatus === 'loggedIn' && (
                        <li>
                          <a href={this.userProfileUrl} onClick={e => this.clickHandler(e, 'profile', { url: this.userProfileUrl})}>
                            {this.userProfileName}
                            <span class="profile-label"> - Mijn profiel</span>
                          </a>
                        </li>
                      )}
                    {this.authStatus === 'loggedOut' && (
                      <li>
                        {this.loginUrl
                          ? <a href={this.loginUrl} onClick={e => this.clickHandler(e, 'login', { url: this.loginUrl })}>Inloggen</a>
                          : <button type="button" onClick={e => this.clickHandler(e, 'login')}>Inloggen</button>
                        }
                      </li>
                    )}
                    {this.authStatus === 'loggedIn' && (
                      <li>
                        {this.logoutUrl
                          ? <a href={this.logoutUrl} onClick={e => this.clickHandler(e, 'logout', { url: this.logoutUrl })}>Uitloggen</a>
                          : <button type="button" onClick={e => this.clickHandler(e, 'logout')}>Uitloggen</button>
                        }
                      </li>
                    )}
                  </ul>
                </div>
              </dso-dropdown-menu>
            </div>
          )}
          {!this.showDropDown && (
            <>
              <div class="dso-header-session">
                {this.userProfileUrl &&
                  this.userProfileName &&
                  this.authStatus === 'loggedIn' && (
                    <div class="profile">
                      <span class="profile-label">Welkom:</span>
                      <a href={this.userProfileUrl} onClick={e => this.clickHandler(e, 'profile', { url: this.userProfileUrl })}>{this.userProfileName}</a>
                    </div>
                  )}
                {this.authStatus === 'loggedOut' && (
                  <div class="login">
                    {this.loginUrl
                      ? <a href={this.loginUrl} onClick={e => this.clickHandler(e, 'login', { url: this.loginUrl })}>Inloggen</a>
                      : <button class="dso-tertiary" type="button" onClick={e => this.clickHandler(e, 'login')}>Inloggen</button>
                    }
                  </div>
                )}
                {this.authStatus === 'loggedIn' && (
                  <div class="logout">
                    {this.logoutUrl
                      ? <a href={this.logoutUrl} onClick={e => this.clickHandler(e, 'logout', { url: this.logoutUrl })}>Uitloggen</a>
                      : <button class="dso-tertiary" type="button" onClick={e => this.clickHandler(e, 'logout')}>Uitloggen</button>
                    }
                  </div>
                )}
              </div>
              {((this.mainMenu && this.mainMenu.length > 0) || this.userHomeUrl) && (
                <nav class="dso-navbar">
                  <ul
                    class="dso-nav dso-nav-main"
                    ref={(element) => (this.nav = element)}
                  >
                    {this.mainMenu && this.mainMenu
                      .filter((_, index) => index < this.mainMenu!.length - this.overflowMenuItems)
                      .map(this.MenuItem)}
                    {this.overflowMenuItems > 0 && (
                      <li>
                        <dso-dropdown-menu dropdown-align="left">
                          <button type="button" slot="toggle">
                            <span>Meer</span>
                          </button>
                          <div class="dso-dropdown-options">
                            <ul>
                              {this.mainMenu && this.mainMenu
                                .filter((_, index) => index >= this.mainMenu!.length - this.overflowMenuItems)
                                .map(this.MenuItem)}
                            </ul>
                          </div>
                        </dso-dropdown-menu>
                      </li>
                    )}
                    {this.userHomeUrl && (
                      <li class="menu-user-home">
                        <a href={this.userHomeUrl} onClick={e => this.clickHandler(e, 'userHome', { url: this.userHomeUrl})}>
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
