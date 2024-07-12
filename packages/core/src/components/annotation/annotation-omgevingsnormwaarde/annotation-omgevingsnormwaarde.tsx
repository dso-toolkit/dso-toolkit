import { Component, ComponentInterface, Prop, Event, h, EventEmitter, Fragment, Element } from "@stencil/core";

import { AnnotationActiveChangeEvent, AnnotationWijzigactie } from "../annotation.interfaces";
import { AnnotationBody } from "../annotation-body";
import { AnnotationGewijzigdeLocatie } from "../annotation-gewijzigde-locatie";
import { watcher } from "../annotation-watcher";
import { AnnotationSymbolSlot } from "../annotation-symbol-slot";
import { RenvooiValue } from "../../renvooi/renvooi.interfaces";

/**
 * test
 * @slot symbool - Een optionele afbeelding die de annotatie symboliseert.
 */
@Component({
  tag: "dso-annotation-omgevingsnormwaarde",
  styleUrl: "../annotation.scss",
  shadow: true,
})
export class AnnotationOmgevingsnormwaarde implements ComponentInterface {
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
   * De naam van de omgevingsnorm of omgevingswaarde.
   */
  @Prop()
  naam?: RenvooiValue | string;

  /**
   * De toelichting van de waardes.
   */
  @Prop()
  toelichting?: string;

  /**
   * De waardes van de omgevingsnorm of omgevingswaarde.
   */
  @Prop()
  waardes?: Array<RenvooiValue | string>;

  /**
   * De eenheid van de omgevingsnorm of omgevingswaarde.
   */
  @Prop()
  eenheid?: RenvooiValue | string;

  @Element()
  private host!: HTMLDsoAnnotationOmgevingsnormwaardeElement;

  private watcher = watcher(this.host);

  connectedCallback(): void {
    this.watcher.watch();
  }

  disconnectedCallback(): void {
    this.watcher.unwatch();
  }

  render() {
    const hasSymbool = this.watcher.hasSymbool();

    return (
      <AnnotationBody
        symbol={hasSymbool ? <AnnotationSymbolSlot /> : undefined}
        active={this.active || false}
        dsoActiveChange={this.dsoActiveChange}
        title={
          <>
            <dso-renvooi value={this.naam} />
            {this.eenheid && (
              <>
                {" "}
                (in <dso-renvooi value={this.eenheid} />)
              </>
            )}
          </>
        }
        data={
          <>
            <span class="content">
              {this.toelichting && <>{this.toelichting}: </>}
              <dso-renvooi value={this.waardes} />
            </span>
            {this.gewijzigdeLocatie && <AnnotationGewijzigdeLocatie />}
          </>
        }
      />
    );
  }
}
