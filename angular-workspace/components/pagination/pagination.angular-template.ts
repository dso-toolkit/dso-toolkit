import { Pagination } from "dso-toolkit";

import { ComponentImplementation } from "../../templates";

export const angularPagination: ComponentImplementation<Pagination> = {
  component: "pagination",
  implementation: "angular",
  template: () =>
    function paginationTemplate(props) {
      return {
        props,
        template: `
          <dso-pagination
            [totalPages]="totalPages"
            [currentPage]="currentPage"
            [formatHref]="formatHref"
            (dsoSelectPage)="dsoSelectPage()"
          ></dso-pagination>
        `,
      };
    },
};
