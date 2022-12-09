import { html } from "lit-html";
import { Templates } from "../../templates";

export function activeBody() {
  return html`<p>
    U wilt de werkzaamheid <strong>Dakkapel plaatsen, vervangen of veranderen</strong> verwijderen. Uw antwoorden op de
    vragen worden dan ook verwijderd. Wilt u doorgaan?
  </p>`;
}

export function activeFooter({ buttonTemplate }: Templates) {
  return html`
    ${buttonTemplate({ label: "Annuleren", type: "button", variant: "tertiary" })}
    ${buttonTemplate({ label: "Secundaire actie", type: "button", variant: "secondary" })}
    ${buttonTemplate({ label: "Bevestigen", type: "button", variant: "primary" })}
  `;
}

export function passiveBody({ listTemplate }: Templates) {
  return html`
    <p>Gebruik de volgende bestandsformaten voor een document:</p>
    ${listTemplate({
      items: [
        { text: "Foto's en gescande documenten: PNG, TIFF" },
        { text: "Digitale documenten: ODT1.2, PDF/A-1, PDF/A-2" },
        { text: "Tekeningen: PDF/A-2, 5VG" },
        { text: "Spreadsheet: [SV, 0E1512, PDF/A" },
      ],
    })}
    <p>
      Als u documenten in een ander formaat opstuurt, moet u het document mogelijk nog een keer sturen, maar dan in het
      juiste bestandsformaat. Dit geldt voor:
    </p>
    ${listTemplate({
      items: [
        { text: "Digitale documenten: DOC, DOCX PDF1.7" },
        { text: "Foto's en gescande documenten: WEG" },
        { text: "Geografische bestanden (2D en 3D): GML33.1 ESRI SHAPE (inclusief aanvullende metabestanden)" },
        { text: "Tekeningen: DXF, PDF 17" },
        { text: "Bint-bestanden (2D en 30): IFC en IFCXML" },
        { text: "Spreadsheet: XLS, XLSX" },
        { text: "Data: XML en RDF" },
        { text: "Lozingsrisico's SDF" },
        { text: "CAD bestanden: DWG, DGN en DXF" },
      ],
    })}
  `;
}

export function passiveFooter({ buttonTemplate }: Templates) {
  return buttonTemplate({ label: "Sluiten", variant: "tertiary", type: "button" });
}

export function confirmBody({ anchorTemplate }: Templates) {
  return html`
    <p>
      Welkom op het nieuwe Omgevingsloket. Deze website is nog in ontwikkeling. Dat betekent dat bepaalde onderdelen nog
      niet beschikbaar zijn. En dat u geen rechten kunt ontlenen aan de teksten in de vergunningcheck en regels op de
      kaart. Ook kunt u nog geen aanvraag of melding indienen via dit loket.
    </p>
    <p>
      De website ${anchorTemplate({ label: "Aan de slag met de omgevingswet", url: "#" })} biedt extra uitleg over het
      Omgevingsloket en de ontwikkeling ervan. Ook vindt u informatie over hoe u kunt oefenen met aansluiten van uw
      lokale systemen op het loket.
    </p>
  `;
}
export function confirmFooter({ buttonTemplate }: Templates) {
  return html`
    ${buttonTemplate({ label: "Secundaire actie", variant: "secondary", type: "button" })}
    ${buttonTemplate({ label: "Bevestigen", variant: "primary", type: "button" })}
  `;
}

export function loadingBody({ progressIndicatorTemplate }: Templates) {
  return progressIndicatorTemplate({
    label: "Resultaten laden. Een moment geduld.",
    block: true,
  });
}
