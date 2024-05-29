import { Component, ComponentInterface, Prop, Event, h, EventEmitter, FunctionalComponent } from "@stencil/core";
import { AnnotationActiveChangeEvent, AnnotationDiff, AnnotationWijzigactie } from "../annotation.interfaces";

@Component({
  tag: "dso-annotation-activiteit",
  styleUrl: "../annotation.scss",
  shadow: true,
})
export class AnnotationActiviteit implements ComponentInterface {
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
      <div class="annotation-body">
        <div class="annotation-symbol">
          <slot name="symbool" />
        </div>
        <div class="annotation-info">
          <p class="annotation-name">
            <AnnotationDiffRenderer value={this.naam} />
          </p>
          <p class="annotation-data">
            <AnnotationDiffRenderer value={this.regelKwalificatie} />
            {this.regelKwalificatieVoorzetsel ? ` ${this.regelKwalificatieVoorzetsel}: ` : ""}
            <AnnotationDiffRenderer value={this.locatieNoemers} />
            {this.gewijzigdeLocatie && (
              <dso-label status="warning" compact>
                gewijzigde locatie
              </dso-label>
            )}
          </p>
        </div>
        <div class="annotation-control">
          <dso-slide-toggle
            checked={this.active}
            onDsoActiveChange={(e) =>
              this.dsoActiveChange.emit({ current: Boolean(this.active), next: !this.active, originalEvent: e })
            }
          ></dso-slide-toggle>
        </div>
      </div>
    );
  }
}

const AnnotationDiffRenderer: FunctionalComponent<{
  value: AnnotationDiff | string | undefined | Array<AnnotationDiff | string | undefined>;
}> = ({ value }) => {
  if (typeof value === "string" || !value) {
    return <span>{value}</span>;
  }

  if ("toegevoegd" in value) {
    return <ins>{value.toegevoegd}</ins>;
  }

  if ("verwijderd" in value) {
    return <del>{value.verwijderd}</del>;
  }

  if (Array.isArray(value)) {
    return (
      <span>
        {value.map((v, i) => (
          <span key={i}>
            <AnnotationDiffRenderer value={v} />
            {i < value.length - 1 ? ", " : ""}
          </span>
        ))}
      </span>
    );
  }

  return (
    <span>
      <del>{value.was}</del> <span>{value.wordt}</span>
    </span>
  );
};
