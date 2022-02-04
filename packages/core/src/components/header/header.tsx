import {
  Component,
  Element,
  Fragment,
  h,
  Prop,
  State,
  Watch,
} from "@stencil/core";

import clsx from "clsx";
import debounce from "debounce";

const minDesktopViewportWidth = 992;

export interface HeaderMenuItem {
  label: string;
  url: string;
  active?: boolean;
}

@Component({
  tag: "dso-header",
  styleUrl: "header.scss",
  shadow: true,
})
export class Header {
  @Prop()
  loginUrl?: string;

  @Prop()
  logoutUrl?: string;

  @Prop()
  mainMenu!: HeaderMenuItem[];

  @Prop()
  useDropDownMenu: "allways" | "never" | "auto" = "auto";

  @State()
  showDropDown: boolean = false;

  @Prop()
  isLoggedIn: boolean = false;

  @Prop()
  userProfileName?: string;

  @Prop()
  userProfileUrl?: string;

  @Prop()
  userHomeUrl?: string;

  @Element()
  host!: HTMLElement;

  @State()
  hasSubLogo: boolean = false;

  @State()
  overflowMenuItems: number = 0;

  @Watch("useDropDownMenu")
  watchUseDropDownMenu(value: "allways" | "never" | "auto") {
    if (value === "auto") {
      this.setDropDownMenu();
      return;
    }

    this.showDropDown = value === "allways";
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

    if (this.overflowMenuItems >= this.mainMenu.length) {
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

  MenuItem(item: HeaderMenuItem) {
    return (
      <li class={item.active ? "dso-active" : undefined}>
        <a href={item.url} aria-current={item.active ? "page" : undefined}>
          {item.label}
        </a>
      </li>
    );
  }

  render() {
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
          {this.showDropDown && (
            <div class="dropdown">
              <dso-dropdown-menu dropdown-align="right">
                <button type="button" class="tertiary" slot="toggle">
                  <span>Menu</span>
                </button>
                <div class="dso-dropdown-options">
                  <dso-dropdown-options>
                    <ul>
                      {this.mainMenu.map(this.MenuItem)}
                      {this.userHomeUrl && (
                        <li>
                          <a href={this.userHomeUrl}>Mijn Omgevingsloket</a>
                        </li>
                      )}
                      {this.loginUrl && !this.isLoggedIn && (
                        <li>
                          <a href={this.loginUrl}>Inloggen</a>
                        </li>
                      )}
                      {this.userProfileUrl &&
                        this.userProfileName &&
                        this.isLoggedIn && (
                          <li>
                            <a href={this.userProfileUrl}>
                              {this.userProfileName}
                              <span class="profile-label">- Mijn profiel</span>
                            </a>
                          </li>
                        )}
                      {this.logoutUrl && this.isLoggedIn && (
                        <li>
                          <a href={this.logoutUrl}>Uitloggen</a>
                        </li>
                      )}
                    </ul>
                  </dso-dropdown-options>
                </div>
              </dso-dropdown-menu>
            </div>
          )}
          {!this.showDropDown && (
            <>
              <div class="dso-header-session">
                {this.userProfileUrl &&
                  this.userProfileName &&
                  this.isLoggedIn && (
                    <div class="profile">
                      <span class="profile-label">Welkom:</span>
                      <a href={this.userProfileUrl}>{this.userProfileName}</a>
                    </div>
                  )}
                {this.loginUrl && !this.isLoggedIn && (
                  <div class="login">
                    <a href={this.loginUrl}>Inloggen</a>
                  </div>
                )}
                {this.logoutUrl && this.isLoggedIn && (
                  <div class="logout">
                    <a href={this.logoutUrl}>Uitloggen</a>
                  </div>
                )}
              </div>
              <nav class="dso-navbar">
                <ul
                  class="dso-nav dso-nav-main"
                  ref={(element) => (this.nav = element)}
                >
                  {this.mainMenu
                    .filter(
                      (_, index) =>
                        index < this.mainMenu.length - this.overflowMenuItems
                    )
                    .map(this.MenuItem)}
                  {this.overflowMenuItems > 0 && (
                    <li>
                      <dso-dropdown-menu dropdown-align="left">
                        <button type="button" class="tertiary" slot="toggle">
                          <span>Meer</span>
                        </button>
                        <div class="dso-dropdown-options">
                          <dso-dropdown-options>
                            <ul>
                              {this.mainMenu
                                .filter(
                                  (_, index) =>
                                    index >=
                                    this.mainMenu.length -
                                      this.overflowMenuItems
                                )
                                .map(this.MenuItem)}
                            </ul>
                          </dso-dropdown-options>
                        </div>
                      </dso-dropdown-menu>
                    </li>
                  )}
                  {this.userHomeUrl && (
                    <li class="menu-user-home">
                      <a href={this.userHomeUrl}>
                        <dso-icon icon="user-line"></dso-icon>
                        Mijn Omgevingsloket
                      </a>
                    </li>
                  )}
                </ul>
              </nav>
            </>
          )}
        </div>
      </>
    );
  }
}
