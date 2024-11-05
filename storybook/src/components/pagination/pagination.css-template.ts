import { Pagination } from "dso-toolkit";
import { html, nothing } from "lit-html";
import { ComponentImplementation } from "../../templates";

export const cssPagination: ComponentImplementation<Pagination> = {
  component: "pagination",
  implementation: "html-css",
  template: () =>
    function paginationTemplate({ currentPage, totalPages }) {
      return html`
        <nav class="pagination" aria-label="Paginering">
          <ul>
            ${currentPage !== 1
              ? html`
                  <li>
                    <a href="#" aria-label="Vorige">
                      <span class="dso-previous" aria-hidden="true"></span>
                    </a>
                  </li>
                  <li>
                    <a href="#">1</a>
                  </li>
                `
              : nothing}
            ${currentPage >= 5 && totalPages >= 7 ? html` <li><span>...</span></li>` : nothing}
            ${currentPage >= 4 && totalPages >= 5
              ? html`
                  <li>
                    <a href="#">${currentPage - 2}</a>
                  </li>
                `
              : nothing}
            ${currentPage >= 3 && totalPages >= 5
              ? html`
                  <li>
                    <a href="#">${currentPage - 1}</a>
                  </li>
                `
              : nothing}
            <li class="active">
              <span aria-current="page">
                ${currentPage}
                ${currentPage === totalPages ? html`<span class="sr-only"> (laatste pagina)</span>` : nothing}
              </span>
            </li>
            ${currentPage <= totalPages - 2
              ? html`
                  <li>
                    <a href="#">${currentPage + 1}</a>
                  </li>
                `
              : nothing}
            ${currentPage <= totalPages - 3
              ? html`
                  <li>
                    <a href="#">${currentPage + 2}</a>
                  </li>
                `
              : nothing}
            ${totalPages - currentPage >= 4 && totalPages >= 7 ? html` <li><span>...</span></li>` : nothing}
            ${currentPage !== totalPages
              ? html`
                  <li>
                    <a href="#">${totalPages} <span class="sr-only"> (laatste pagina)</span></a>
                  </li>
                  <li>
                    <a href="#" aria-label="Volgende">
                      <span class="dso-next" aria-hidden="true"></span>
                    </a>
                  </li>
                `
              : nothing}
          </ul>
        </nav>
      `;
    },
};
