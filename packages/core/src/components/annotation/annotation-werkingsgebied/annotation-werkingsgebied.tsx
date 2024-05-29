import { Component, ComponentInterface, Prop, Event, h, EventEmitter } from "@stencil/core";
import { AnnotationActiveChangeEvent, AnnotationDiff, AnnotationWijzigactie } from "../annotation.interfaces";
import { Annotation } from "../annotation.template";

@Component({
  tag: "dso-annotation-werkingsgebied",
  styleUrl: "../annotation.scss",
  shadow: true,
})
export class AnnotationWerkingsgebied implements ComponentInterface {
  /**
   * Een URL naar de verbeelding van de legenda.
   */
  @Prop()
  symbool?: string;

  /**
   * Een optionele wijzigactie die aangeeft of de annotatie toegevoegd of verwijderd is.
   */
  @Prop()
  wijzigactie?: AnnotationWijzigactie;

  /**
   * Een optionele boolean die aangeeft of de annotatie actief is.
   */
  @Prop()
  active?: boolean;

  /**
   * Een optionele boolean die aangeeft of de locatie van de annotatie gewijzigd is.
   */
  @Prop({ reflect: true })
  gewijzigdeLocatie?: boolean;

  /**
   * Een optionele event listener voor wijzigingen aan de status van de annotatie.
   */
  @Event()
  dsoActiveChange!: EventEmitter<AnnotationActiveChangeEvent>;

  /**
   * De noemer van de locatie.
   */
  @Prop()
  locatieNoemer?: Array<AnnotationDiff | string>;

  render() {
    return (
      <Annotation
        type="werkingsgebied"
        symbool={this.symbool}
        wijzigactie={this.wijzigactie}
        active={this.active}
        gewijzigdeLocatie={this.gewijzigdeLocatie}
        dsoActiveChange={this.dsoActiveChange}
        locatieNoemers={this.locatieNoemer}
      />
    );
  }
}
