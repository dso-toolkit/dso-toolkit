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
          {this.userProfileUrl && this.userProfileName && this.isLoggedIn && (
            <div class="profile">
              <span class="profile-label">Welkom:</span>
              <a href={this.userProfileUrl}>{this.userProfileName}</a>
            </div>
          )}
        </div>
        <div class="lower">
          {this.userHomeUrl && (
            <div class="home">
              <a href={this.userHomeUrl}>Mijn Omgevingsloket</a>
            </div>
          )}
          <nav class="dso-navbar">
            <ul class="dso-nav dso-nav-main">
              {this.mainMenu.map((item) => (
                <li>
                  <a href={item.url}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </>
    );
  }
}
