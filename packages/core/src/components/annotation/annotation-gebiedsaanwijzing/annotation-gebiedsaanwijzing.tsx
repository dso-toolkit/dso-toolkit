import { Component, ComponentInterface, Prop, Event, h, EventEmitter, Fragment } from "@stencil/core";
import { AnnotationActiveChangeEvent, AnnotationDiff, AnnotationWijzigactie } from "../annotation.interfaces";
import { AnnotationBody } from "../annotation-body";
import { AnnotationDiffRenderer } from "../annotation-diff-renderer";
import { AnnotationGewijzigdeLocatie } from "../annotation-gewijzigde-locatie";

/**
 * @slot symbool - Een optionele afbeelding die de annotatie symboliseert.
 */
@Component({
  tag: "dso-annotation-gebiedsaanwijzing",
  styleUrl: "../annotation.scss",
  shadow: true,
})
export class AnnotationGebiedsaanwijzing implements ComponentInterface {
  /**
   * Een optionele wijzigactie die aangeeft of de annotatie toegevoegd of verwijderd is.
   */
  @Prop({ reflect: true })
  wijzigactie?: AnnotationWijzigactie;

  /**
   * Een optionele boolean die aangeeft of de annotatie actief is.
   */
  @Prop({ reflect: true })
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
   * De naam van de gebiedsaanwijzing.
   */
  @Prop()
  naam?: AnnotationDiff | string;

  render() {
    return (
      <AnnotationBody
        active={this.active}
        dsoActiveChange={this.dsoActiveChange}
        title={
          <>
            <span class="content">
              <AnnotationDiffRenderer value={this.naam} />
            </span>
            {this.gewijzigdeLocatie && <AnnotationGewijzigdeLocatie />}
          </>
        }
      />
    );
  }
}
