import { DropdownMenu } from "dso-toolkit";

import { ComponentImplementation } from "../../templates";

export const angularDropdownMenu: ComponentImplementation<DropdownMenu> = {
  component: "dropdownMenu",
  implementation: "angular",
  template: () =>
    function dropdownMenuTemplate(props) {
      return {
        props,
        template: `
          <dso-dropdown-menu
            [dropdownAlign]="dropdownAlign === 'right' ? 'right' : undefined"
            [checkable]="isCheckable || undefined"
          >
            <button type="button" [class]="'dso-' + button.variant" slot="toggle">
              <span>{{ button.label }}</span>
            </button>
            <div class="dso-dropdown-options">
              <ng-container *ngFor="let group of groups; let i = index">
                <h2 *ngIf="group.header" class="dso-group-label">{{ group.header }}</h2>

                <ul>
                  <ng-container *ngFor="let item of group.items">
                    <li [class.dso-checked]="item.checked">
                      <ng-container [ngSwitch]="item.type">
                        <a *ngSwitchCase="'anchor'" [href]="item.url">{{ item.label }}</a>
                        <button *ngSwitchDefault type="button">{{ item.label }}</button>
                      </ng-container>
                    </li>
                  </ng-container>
                </ul>
              </ng-container>
            </div>
          </dso-dropdown-menu>
        `,
      };
    },
};
