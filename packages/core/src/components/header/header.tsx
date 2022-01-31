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
              <dso-dropdown-menu dropdown-align="right">
                <button type="button" class="tertiary" slot="toggle">
                  <span>Menu</span>
                </button>
                <div class="dso-dropdown-options">
                  <dso-dropdown-options>
                    <ul>
                      {this.mainMenu.map((item) => (
                        <li>
                          <a href={item.url}>{item.label}</a>
                        </li>
                      ))}
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
                {this.mainMenu
                  .filter((_, index) => (this.splitMenu ? index < 2 : true))
                  .map((item) => (
                    <li>
                      <a href={item.url}>{item.label}</a>
                    </li>
                  ))}
                {this.splitMenu && (
                  <li>
                    <dso-dropdown-menu dropdown-align="left">
                      <button type="button" class="tertiary" slot="toggle" tabindex={"0"}>
                        <span>Meer</span>
                      </button>
                      <div class="dso-dropdown-options">
                        <dso-dropdown-options>
                          <ul>
                            {this.mainMenu
                              .filter((_, index) => index >= 2)
                              .map((item) => (
                                <li>
                                  <a href={item.url}>{item.label}</a>
                                </li>
                              ))}
                          </ul>
                        </dso-dropdown-options>
                      </div>
                    </dso-dropdown-menu>
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
