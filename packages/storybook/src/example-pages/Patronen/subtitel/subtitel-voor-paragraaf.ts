import { html } from 'lit-html';

import { examplePageFactory } from '../../../example-page-factory';
import { headerPartial } from '../../partials/header';
import { header } from '../../partials/header.content';

examplePageFactory(
  'Patronen/Subtitel',
  'Subtitel voor een Paragraaf',
  ({}, templates) => html`
    <div class="container">
      ${headerPartial(templates, header)}

      <main>
        <h1>Stelselcatalogus Omgevingswet</h1>
        <p role="doc-subtitle">Subtitel</p>
        <p>De Stelselcatalogus Omgevingswet (DSO StelselCatalogus) is een online naslagwerk en dient als ondersteunend binnen de DSO-LV. In de DSO StelselCatalogus kunt u begrippen, activiteiten, werkzaamheden, waardelijsten en informatieproducten vinden die bruikbaar zijn binnen de DSO Keten en afkomstig uit diverse domeinen.</p>
      </main>
    </div>
  `
);
