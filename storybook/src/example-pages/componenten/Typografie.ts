import { html } from "lit-html";

import { examplePageFactory } from "../../example-page-factory";

examplePageFactory(
  "Voorbeeldpagina's",
  "Toepassingen/Componenten",
  "Typografie",
  ({ anchorTemplate }) => html`
    <div class="container">
      <div class="dso-table-responsive">
        <table class="table">
          <caption class="sr-only">
            Overzicht van gebruikersnamen
          </caption>
          <thead>
            <tr>
              <th scope="col" class="col-xs-2">Beschrijving</th>
              <th scope="col" class="col-xs-5">Markup</th>
              <th scope="col" class="col-xs-5">Preview</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Heading 1</th>
              <td>
                <code>&#60;h1&gt;Heading&#60;/h1&gt;</code>
              </td>
              <td>
                <h1>Bold 32px #39870C</h1>
              </td>
            </tr>
            <tr>
              <th scope="row">Heading met subtitel</th>
              <td>
                <code>&#60;h1&gt;Heading&#60;/h1&gt;&#60;p role="doc-subtitle"&gt;Subtitel&#60;/p&gt;</code>
              </td>
              <td>
                <h1>Bold 32px #39870C</h1>
                <p role="doc-subtitle">Bold 16px #191919</p>
              </td>
            </tr>
            <tr>
              <th scope="row">Heading 2</th>
              <td>
                <code>&#60;h2&gt;Heading&#60;/h2&gt;</code>
              </td>
              <td>
                <h2>Bold 24px #39870C</h2>
              </td>
            </tr>
            <tr>
              <th scope="row">Heading 3</th>
              <td>
                <code>&#60;h3&gt;Heading&#60;/h3&gt;</code>
              </td>
              <td>
                <h3>SemiBold 20px #39870C</h3>
              </td>
            </tr>
            <tr>
              <th scope="row">Heading 4</th>
              <td>
                <code>&#60;h4&gt;Heading&#60;/h4&gt;</code>
              </td>
              <td>
                <h4>SemiBold 16px #39870C</h4>
              </td>
            </tr>
            <tr>
              <th scope="row">Heading 5</th>
              <td>
                <code>&#60;h5&gt;Heading&#60;/h5&gt;</code>
              </td>
              <td>
                <h5>SemiBold 16px #191919</h5>
              </td>
            </tr>
            <tr>
              <th scope="row">Body text</th>
              <td>
                <code>&#60;p&gt;Text&#60;/p&gt;</code>
              </td>
              <td>
                <p>Regular 16px #191919</p>
              </td>
            </tr>
            <tr>
              <th scope="row">Small text</th>
              <td>
                <code>&#60;small&gt;Klein&#60;/small&gt;</code>
              </td>
              <td>
                <small>Regular 14px #191919</small>
              </td>
            </tr>
            <tr>
              <th scope="row">Caption</th>
              <td>
                <code>&#60;span class="caption"l&gt;Klein&#60;/span&gt;</code>
              </td>
              <td>
                <span class="caption">Italic 16px #191919</span>
              </td>
            </tr>
            <tr>
              <th scope="row">Anchor</th>
              <td>
                <code>&#60;a href="#"&gt;Anchor&#60;/a&gt;</code>
              </td>
              <td>
                ${anchorTemplate({ label: "Example", url: "#" })}
                <ul>
                  <li>${anchorTemplate({ label: "Anchor #39870C", url: "#" })}</li>
                  <li>${anchorTemplate({ label: "Hover #676CB0", url: "#" })}</li>
                  <li>${anchorTemplate({ label: "Visited #8B4A6AC", url: "#" })}</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
);
