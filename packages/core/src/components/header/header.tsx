import { Component, Fragment, h, Prop } from "@stencil/core";

export interface HeaderMenuItem {
  label: string;
  url: string;
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
  useDropDown: boolean = false;

  @Prop()
  splitMenu: boolean = false;

  @Prop()
  isLoggedIn: boolean = false;

  @Prop()
  userProfileName?: string;

  @Prop()
  userProfileUrl?: string;

  @Prop()
  userHomeUrl?: string;

  render() {
    return (
      <>
        <div class="upper">
          <div class="logo">
            <slot name="logo" />
          </div>
          <div class="sub-logo">
            <slot name="sub-logo" />
          </div>
          {this.useDropDown && (
            <div class="dropdown">
              <button>Menu</button>
            </div>
          )}
          {this.loginUrl && !this.isLoggedIn && !this.useDropDown && (
            <div class="login">
              <a href={this.loginUrl}>Inloggen</a>
            </div>
          )}
          {this.logoutUrl && this.isLoggedIn && !this.useDropDown && (
            <div class="logout">
              <a href={this.logoutUrl}>Uitloggen</a>
            </div>
          )}
          {this.userProfileUrl &&
            this.userProfileName &&
            this.isLoggedIn &&
            !this.useDropDown && (
              <div class="profile">
                <span class="profile-label">Welkom:</span>
                <a href={this.userProfileUrl}>{this.userProfileName}</a>
              </div>
            )}
        </div>
        <div class="lower">
          {!this.useDropDown && (
            <nav class="dso-navbar">
              <ul class="dso-nav dso-nav-main">
                {this.mainMenu.map((item) => (
                  <li>
                    <a href={item.url}>{item.label}</a>
                  </li>
                ))}
                {this.splitMenu && (
                  <li class="menu-show-more">
                    <button>Meer</button>
                  </li>
                )}
                {this.userHomeUrl && !this.useDropDown && (
                  <li class="menu-user-home">
                    <a href={this.userHomeUrl}>Mijn Omgevingsloket</a>
                  </li>
                )}
              </ul>
            </nav>
          )}
        </div>
      </>
    );
  }
}
