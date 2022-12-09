import { StoryFnAngularReturnType } from "@storybook/angular/dist/ts3.9/client/preview/types";

import { Banner } from "dso-toolkit";
import { ComponentImplementation } from "../../templates";

export const angularBanner: ComponentImplementation<Banner<StoryFnAngularReturnType>> = {
  component: "banner",
  implementation: "angular",
  template: () =>
    function bannerTemplate(props) {
      return {
        props,
        template: `
          <dso-banner [status]="status">
            <div class="container">
              <div class="row">
                <div class="col-sm-12">
                  <div [outerHTML]="content.template"></div>
                  <button
                    type="button"
                    class="dso-tertiary"
                    (click)="onClick?.($event.nativeEvent)"
                  >
                    <span class="sr-only">Sluiten</span>
                    <dso-icon icon="times"></dso-icon>
                  </button>
                </div>
              </div>
            </div>
          </dso-banner>
        `,
      };
    },
};
