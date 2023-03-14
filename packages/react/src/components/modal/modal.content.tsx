import * as React from "react";
import { Templates } from "../../templates";

export const activeBody = (
  <p>
    U wilt de werkzaamheid <strong>Dakkapel plaatsen, vervangen of veranderen</strong> verwijderen. Uw antwoorden op de
    vragen worden dan ook verwijderd. Wilt u doorgaan?
  </p>
);

export const activeFooter = (
  <>
    <button type="button" className="dso-tertiary">
      <span>Annuleren</span>
    </button>
    <button type="button" className="dso-secondary">
      <span>Secundaire actie</span>
    </button>
    <button type="button" className="dso-primary">
      <span>Bevestigen</span>
    </button>
  </>
);

export const passiveBody = (
  <>
    <p>Gebruik de volgende bestandsformaten voor een document:</p>
    <ul>
      <li>Foto's en gescande documenten: PNG, TIFF</li>
      <li>Digitale documenten: ODT1.2, PDF/A-1, PDF/A-2</li>
      <li>Tekeningen: PDF/A-2, 5VG</li>
      <li>Spreadsheet: [SV, 0E1512, PDF/A</li>
    </ul>
    <p>
      Als u documenten in een ander formaat opstuurt, moet u het document mogelijk nog een keer sturen, maar dan in het
      juiste bestandsformaat. Dit geldt voor:
    </p>
    <ul>
      <li>Digitale documenten: DOC, DOCX PDF1.7</li>
      <li>Foto's en gescande documenten: WEG</li>
      <li>Geografische bestanden (2D en 3D): GML33.1 ESRI SHAPE (inclusief aanvullende metabestanden)</li>
      <li>Tekeningen: DXF, PDF 17</li>
      <li>Bint-bestanden (2D en 30): IFC en IFCXML</li>
      <li>Spreadsheet: XLS, XLSX</li>
      <li>Data: XML en RDF</li>
      <li>Lozingsrisico's SDF</li>
      <li>CAD bestanden: DWG, DGN en DXF</li>
    </ul>
  </>
);

export const passiveFooter = (
  <button type="button" className="dso-tertiary">
    <span>Sluiten</span>
  </button>
);

export const confirmBody = (
  <>
    <p>
      Welkom op het nieuwe Omgevingsloket. Deze website is nog in ontwikkeling. Dat betekent dat bepaalde onderdelen nog
      niet beschikbaar zijn. En dat u geen rechten kunt ontlenen aan de teksten in de vergunningcheck en regels op de
      kaart. Ook kunt u nog geen aanvraag of melding indienen via dit loket.
    </p>
    <p>
      De website <a href="#">Aan de slag met de omgevingswet</a> biedt extra uitleg over het Omgevingsloket en de
      ontwikkeling ervan. Ook vindt u informatie over hoe u kunt oefenen met aansluiten van uw lokale systemen op het
      loket.
    </p>
  </>
);

export const confirmFooter = (
  <>
    <button type="button" className="dso-secondary">
      <span>Secundaire actie</span>
    </button>
    <button type="button" className="dso-primary">
      <span>Bevestigen</span>
    </button>
  </>
);

export function loadingBody({ progressIndicatorTemplate }: Templates) {
  return progressIndicatorTemplate({
    label: "Resultaten laden. Een moment geduld.",
    block: true,
  });
}

export function datePickerBody({ datePickerTemplate }: Templates) {
  return datePickerTemplate({
    id: "modal-id",
    disabled: false,
  });
}
