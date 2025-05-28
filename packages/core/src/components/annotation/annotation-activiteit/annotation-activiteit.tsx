import { Component, ComponentInterface, Element, Event, EventEmitter, Fragment, Prop, h } from "@stencil/core";

import { RenvooiValue } from "../../renvooi/renvooi.interfaces";
import { AnnotationBody } from "../annotation-body";
import { AnnotationGewijzigdeLocatie } from "../annotation-gewijzigde-locatie";
import { AnnotationListRenvooiValues } from "../annotation-list-renvooi-values";
import { AnnotationSymbolSlot } from "../annotation-symbol-slot";
import { watcher } from "../annotation-watcher";
import { AnnotationActiveChangeEvent, AnnotationWijzigactie } from "../annotation.interfaces";

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
  naam?: RenvooiValue | string;

  /**
   * De activiteit regel kwalificatie.
   */
  @Prop()
  regelKwalificatie?: RenvooiValue | string;

  /**
   * De noemer van de locatie.
   */
  @Prop()
  locatieNoemers?: Array<RenvooiValue | string>;

  /**
   * Voorzetsel van de regelKwalificatie. Exclusief dubbele punt.
   */
  @Prop()
  regelKwalificatieVoorzetsel?: string;

  @Element()
  private host!: HTMLDsoAnnotationActiviteitElement;

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
        active={this.active}
        dsoActiveChange={this.dsoActiveChange}
        title={<dso-renvooi value={this.naam} />}
        data={
          <>
            <span class="content">
              {this.regelKwalificatie && (
                <>
                  <dso-renvooi value={this.regelKwalificatie} />{" "}
                </>
              )}
              {this.regelKwalificatieVoorzetsel && `${this.regelKwalificatieVoorzetsel}: `}
              <AnnotationListRenvooiValues values={this.locatieNoemers} />
            </span>
            {this.gewijzigdeLocatie && <AnnotationGewijzigdeLocatie />}
          </>
        }
      />
    );
  }
}
