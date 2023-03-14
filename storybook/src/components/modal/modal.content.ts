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

export function datePickerBody({ datePickerTemplate }: Templates) {
  return html`
    ${datePickerTemplate({ id: "modal-id", disabled: false })}
    <p>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
      sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec,
      pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec,
      vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede
      mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.
      Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis,
      feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam
      ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus,
      tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc,
      blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien
      ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed
      fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue
      velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien. Vestibulum purus quam,
      scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit
      fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis
      mi consectetuer lacinia. Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet
      iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris.
      Praesent adipiscing. Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium
      libero. Cras id dui. Aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit amet, nonummy
      id, imperdiet feugiat, pede. Sed lectus. Donec mollis hendrerit risus. Phasellus nec sem in justo pellentesque
      facilisis. Etiam imperdiet imperdiet orci. Nunc nec neque. Phasellus leo dolor, tempus non, auctor et, hendrerit
      quis, nisi. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Maecenas malesuada.
      Praesent congue erat at massa. Sed cursus turpis vitae tortor. Donec posuere vulputate arcu. Phasellus accumsan
      cursus velit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed aliquam,
      nisi quis porttitor congue, elit erat euismod orci, ac placerat dolor lectus quis orci. Phasellus consectetuer
      vestibulum elit. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc. Vestibulum fringilla pede sit
      amet augue. In turpis. Pellentesque posuere. Praesent turpis. Aenean posuere, tortor sed cursus feugiat, nunc
      augue blandit nunc, eu sollicitudin urna dolor sagittis lacus. Donec elit libero, sodales nec, volutpat a,
      suscipit non, turpis. Nullam sagittis. Suspendisse pulvinar, augue ac venenatis condimentum, sem libero volutpat
      nibh, nec pellentesque velit pede quis nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
      posuere cubilia Curae; Fusce id purus. Ut varius tincidunt libero. Phasellus dolor. Maecenas vestibulum mollis
      diam. Pellentesque ut neque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
      egestas.
    </p>
    ${datePickerTemplate({ id: "modal-id-2", disabled: false })}
  `;
}
