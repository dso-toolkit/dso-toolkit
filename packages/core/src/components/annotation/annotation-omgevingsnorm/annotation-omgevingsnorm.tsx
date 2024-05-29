import { Component, ComponentInterface, Prop, Event, h, EventEmitter } from "@stencil/core";
import { AnnotationActiveChangeEvent, AnnotationDiff, AnnotationWijzigactie } from "../annotation.interfaces";
import { Annotation } from "../annotation.template";

@Component({
  tag: "dso-annotation-omgevingsnorm",
  styleUrl: "../annotation.scss",
  shadow: true,
})
export class AnnotationOmgevingsnorm implements ComponentInterface {
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
   * De naam van de omgevingsnorm
   */
  @Prop()
  naam?: AnnotationDiff | string;

  /**
   * De waardes van de omgevingsnorm.
   */
  @Prop()
  waardes?: Array<AnnotationDiff | string>;

  /**
   * De eenheid van de omgevingsnorm.
   */
  @Prop()
  eenheid?: AnnotationDiff | string;

  render() {
    return (
      <Annotation
        type="omgevingsnorm"
        symbool={this.symbool}
        wijzigactie={this.wijzigactie}
        active={this.active}
        gewijzigdeLocatie={this.gewijzigdeLocatie}
        dsoActiveChange={this.dsoActiveChange}
        naam={this.naam}
        waardes={this.waardes}
        eenheid={this.eenheid}
      />
    );
  }
}
