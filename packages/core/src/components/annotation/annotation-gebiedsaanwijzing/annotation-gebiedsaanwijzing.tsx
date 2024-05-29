import { Component, ComponentInterface, Prop, Event, h, EventEmitter } from "@stencil/core";
import { AnnotationActiveChangeEvent, AnnotationDiff, AnnotationWijzigactie } from "../annotation.interfaces";

import { Annotation } from "../annotation.template";

@Component({
  tag: "dso-annotation-gebiedsaanwijzing",
  styleUrl: "../annotation.scss",
  shadow: true,
})
export class AnnotationGebiedsaanwijzing implements ComponentInterface {
  /**
   * Een URL naar de verbeelding van de legenda.
   */
  @Prop()
  symbool?: string;

  /**
   * Een optionele wijzigactie die aangeeft of de annotatie toegevoegd of verwijderd is.
   */
  @Prop({ reflect: true })
  wijzigactie?: AnnotationWijzigactie;

  /**
   * Een optionele boolean die aangeeft of de annotatie actief is.
   */
  @Prop()
  active?: boolean;

  /**
   * Een optionele boolean die aangeeft of de locatie van de annotatie gewijzigd is.
   */
  @Prop()
  gewijzigdeLocatie?: boolean;

  /**
   * Een optionele event listener voor wijzigingen aan de status van de annotatie.
   */
  @Event()
  dsoActiveChange!: EventEmitter<AnnotationActiveChangeEvent>;

  /**
   * De naam van de gebiedsaanwijzing.
   */
  @Prop()
  naam?: AnnotationDiff | string;

  render() {
    return (
      <Annotation
        type="gebiedsaanwijzing"
        symbool={this.symbool}
        wijzigactie={this.wijzigactie}
        active={this.active}
        gewijzigdeLocatie={this.gewijzigdeLocatie}
        dsoActiveChange={this.dsoActiveChange}
        naam={this.naam}
      />
    );
  }
}
