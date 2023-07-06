export interface OzonDocumentComponent {
  ontwerpbesluitIdentificatie: string;
  documentTechnischId: string;
  identificatie: string;
  expressie: string;
  type: string;
  volgordeNummer: number;
  label: string;
  labelXml: string;
  nummer: string;
  nummerXml: string;
  opschrift: string;
  inhoud: string;
  gereserveerd: boolean;
  vervallen: boolean;
  bevatOntwerpInformatie: boolean;
}

export const content: OzonDocumentComponent = {
  ontwerpbesluitIdentificatie: "/akn/nl/bill/gm1979/2021/omgevingsplandelfzijl_ZesdeOntwerp3",
  documentTechnischId:
    "_akn_nl_act_gm1979_2021_omgevingsplandelfzijl_akn_nl_bill_gm1979_2021_omgevingsplandelfzijl_ZesdeOntwerp3",
  identificatie: "gm1979_2__chp_3__subchp_3.1__art_3.3",
  expressie: "chp_3__subchp_3.1__art_3.3",
  type: "ARTIKEL",
  volgordeNummer: 2,
  label: "Artikel",
  labelXml:
    "<?xml version='1.0' encoding='UTF-8' standalone='yes'?><Label xmlns='https://standaarden.overheid.nl/stop/imop/tekst/'>Artikel</Label>",
  nummer: "3.3",
  nummerXml:
    "<?xml version='1.0' encoding='UTF-8' standalone='yes'?><Nummer xmlns='https://standaarden.overheid.nl/stop/imop/tekst/'>3.3</Nummer>",
  opschrift:
    "<?xml version='1.0' encoding='UTF-8' standalone='yes'?><Opschrift xmlns='https://standaarden.overheid.nl/stop/imop/tekst/'>Overgangsrecht: rijksbeschermde stads- en dorpsgezichten</Opschrift>",
  inhoud:
    "<Inhoud xmlns='https://standaarden.overheid.nl/stop/imop/tekst/'><Al>De artikelen 3.28, derde lid, en 3.38, aanhef en onder b, zijn van overeenkomstige toepassing op een activiteit als bedoeld in die artikelonderdelen die wordt verricht op een locatie waarvoor een op grond van artikel 4.35, eerste lid, van de Invoeringswet Omgevingswet als instructie geldende aanwijzing als beschermd stads- of dorpsgezicht als bedoeld in artikel 35, eerste lid, van de Monumentenwet 1988 zoals die wet luidde voor de inwerkingtreding van de Erfgoedwet van kracht is, zolang in dit omgevingsplan aan die locatie nog niet de functie-aanduiding rijksbeschermd stads- of dorpsgezicht is gegeven.</Al></Inhoud>",
  gereserveerd: false,
  vervallen: false,
  bevatOntwerpInformatie: false,
};
