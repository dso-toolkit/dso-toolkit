import { Component, ComponentInterface, Prop, Event, h, Fragment, EventEmitter } from "@stencil/core";
import { AnnotationActiveChangeEvent, AnnotationDiff, AnnotationWijzigactie } from "../annotation.interfaces";
import { AnnotationDiffRenderer } from "../annotation-diff-renderer";
import { AnnotationBody } from "../annotation-body";
import { AnnotationGewijzigdeLocatie } from "../annotation-gewijzigde-locatie";

/**
 * @slot symbool - Een optionele afbeelding die de annotatie symboliseert.
 */
@Component({
  tag: "dso-annotation-activiteit",
  styleUrl: "../annotation.scss",
  shadow: true,
})
export class AnnotationActiviteit implements ComponentInterface {
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
   * De naam van de activiteit.
   */
  @Prop()
  naam?: AnnotationDiff | string;

  /**
   * De activiteit regel kwalificatie.
   */
  @Prop()
  regelKwalificatie?: AnnotationDiff | string;

  /**
   * De noemer van de locatie.
   */
  @Prop()
  locatieNoemers?: Array<AnnotationDiff | string>;

  /**
   * Voorzetsel van de regelKwalificatie. Exclusief dubbele punt.
   */
  @Prop()
  regelKwalificatieVoorzetsel?: string;

  render() {
    return (
      <AnnotationBody
        active={this.active}
        dsoActiveChange={this.dsoActiveChange}
        title={<AnnotationDiffRenderer value={this.naam} />}
        data={
          <>
            <span class="content">
              {this.regelKwalificatie && (
                <>
                  <AnnotationDiffRenderer value={this.regelKwalificatie} />{" "}
                </>
              )}
              {this.regelKwalificatieVoorzetsel && `${this.regelKwalificatieVoorzetsel}: `}
              <AnnotationDiffRenderer value={this.locatieNoemers} />
            </span>
            {this.gewijzigdeLocatie && <AnnotationGewijzigdeLocatie />}
          </>
        }
      />
    );
  }
}
