import * as React from "react";

import { Templates } from "../../templates";

const closeButton = ({ iconTemplate }: Templates) => {
  return (
    <button type="button" className="dso-tertiary" onClick={() => null}>
      <span className="sr-only">Sluiten</span>
      {iconTemplate({ icon: "times" })}
    </button>
  );
};

export const warningRichContent = (templates: Templates) => (
  <>
    <div className="dso-rich-content">
      <h2>Onderhoudsmelding:</h2>
      <p>
        Op <strong>zondag 8 december 2019 van 10.00 uur tot 17.00 uur</strong> vindt er onderhoud plaats aan het
        Omgevingsloket. <a href="#">Meer informatie</a>
      </p>
    </div>
    {closeButton(templates)}
  </>
);

export const warningNonRemovableRichContent = (
  <div className="dso-rich-content">
    <p>Een waarschuwende banner met icon die je niet weg kan klikken.</p>
  </div>
);

export const errorRichContent = (templates: Templates) => (
  <>
    <div className="dso-rich-content">
      <h2>Storingsmelding:</h2>
      <p>Op dit moment ervaren wij een storing in de Vergunningcheck. U kunt wel een aanvraag of melding indienen.</p>
    </div>
    {closeButton(templates)}
  </>
);

export const infoRichContent = (templates: Templates) => (
  <>
    <div className="dso-rich-content">
      <p>Een informatieve banner die je weg kan klikken.</p>
    </div>
    {closeButton(templates)}
  </>
);

export const infoCompactNonRemovableRichContent = (
  <div className="dso-rich-content">
    <p>Deze minder hoge variant van de banner met links uitgelijnde tekst is wat minder opvallend.</p>
  </div>
);

export const richWarningRichContent = (templates: Templates) => (
  <>
    <div className="dso-rich-content">
      <h2>Onderhoudsmelding:</h2>
      <p>
        Banners zullen vaak worden ingezet voor 'one-liners', maar kunnen ook rijkere content bevatten, zoals meerdere
        paragrafen, en/of een geordende lijst. Zolang de markup maar aan de juiste voorschriften voldoet gaat dit prima:
      </p>
      <ul>
        <li>
          class <code>.dso-rich-content</code> op de omringende <code>&lt;div&gt;</code>
        </li>
        <li>
          een <code>&lt;p&gt;</code>-tag om paragrafen
        </li>
      </ul>
    </div>
    {closeButton(templates)}
  </>
);

export const richInfoRichContent = ({ toggletipTemplate }: Templates) => (
  <div className="dso-rich-content">
    <p>
      Deze variant van de <strong>banner</strong> is wat minder opvallend.
      {toggletipTemplate({
        position: "right",
        children: <p>Een toggletip bij de banner</p>,
      })}
    </p>
    <p>Maar kan ook rich content bevatten, bijvoorbeeld een extra paragraaf om meer uit te kunnen leggen</p>
  </div>
);

export const successRichContent = (templates: Templates) => (
  <>
    <div className="dso-rich-content">
      <h2>Gelukt!</h2>
      <p>U bent succesvol ingelogd.</p>
    </div>
    {closeButton(templates)}
  </>
);
