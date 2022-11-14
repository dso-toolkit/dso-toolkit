import * as React from "react";

export const successMessage = <p>Dit is een succesmelding. Deze wordt getoond als een proces succesvol is afgerond.</p>;

export const infoMessage = (
  <p>
    Dit is een informatiemelding. Deze wordt gebruikt voor{" "}
    <a href="#" className="extern" target="_blank" rel="noopener noreferrer">
      aanvullende
    </a>{" "}
    informatie of tips.
  </p>
);

export const warningMessage = <p>Dit is een waarschuwingsmelding. Deze wordt gebruikt voor waarschuwingen.</p>;

export const dangerMessage = (
  <p>
    Dit is een <a href="#">foutmelding</a>. Deze wordt getoond als er iets is misgegaan.
  </p>
);

export const alertWithHeadingsContent = (
  <>
    <h2>Dit is een H2</h2>
    <p>Dit is een informatiemelding. Deze wordt gebruikt voor aanvullende informatie of tips.</p>
    <h3>Dit is een H3</h3>
    <p>Dit is een informatiemelding. Deze wordt gebruikt voor aanvullende informatie of tips.</p>
    <h4>Dit is een H4</h4>
    <p>Dit is een informatiemelding. Deze wordt gebruikt voor aanvullende informatie of tips.</p>
    <h5>Dit is een H5</h5>
    <p>Dit is een informatiemelding. Deze wordt gebruikt voor aanvullende informatie of tips.</p>
    <h6>Dit is een H6</h6>
    <p>Dit is een informatiemelding. Deze wordt gebruikt voor aanvullende informatie of tips.</p>
  </>
);
