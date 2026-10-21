import { Component, ComponentInterface, Element, Event, EventEmitter, Fragment, Prop, State, h } from "@stencil/core";

import { RenvooiValue } from "../../renvooi/renvooi.interfaces";
import { AnnotationBody } from "../annotation-body";
import { AnnotationListRenvooiValues } from "../annotation-list-renvooi-values";
import { AnnotationSymbolSlot } from "../annotation-symbol-slot";
import { watcher } from "../annotation-watcher";
import { AnnotationActiveChangeEvent, AnnotationWijzigactie } from "../annotation.interfaces";

/**
 * @slot meta - Een optioneel slot voor een `Label`, bijvoorbeeld om aan te geven dat de locatie van de annotatie gewijzigd is.
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

  @State()
  hasMeta = false;

  private metaSlot?: HTMLSlotElement;

  private watcher = watcher(this.host);

  private updateMeta = () => {
    this.hasMeta = (this.metaSlot?.assignedNodes({ flatten: true }).length ?? 0) > 0;
  };

  private setMetaSlot = (element: HTMLSlotElement | undefined) => {
    this.metaSlot = element;
    this.updateMeta();
  };

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
              {this.toelichting && <>{this.toelichting}</>}
              {this.waardes && this.waardes.length > 0 && (
                <>
                  : <AnnotationListRenvooiValues values={this.waardes} />
                </>
              )}
            </span>
            <span class="meta" hidden={!this.hasMeta}>
              <slot name="meta" ref={this.setMetaSlot} onSlotchange={this.updateMeta} />
            </span>
          </>
        }
      />
    );
  }
}
