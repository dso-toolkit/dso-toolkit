import { Component, ComponentInterface, Prop, Event, h, EventEmitter, Fragment, Element } from "@stencil/core";
import { AnnotationActiveChangeEvent, AnnotationWijzigactie } from "../annotation.interfaces";
import { AnnotationBody } from "../annotation-body";
import { AnnotationGewijzigdeLocatie } from "../annotation-gewijzigde-locatie";
import { watcher } from "../annotation-watcher";
import { AnnotationSymbolSlot } from "../annotation-symbol-slot";
import { RenvooiValue } from "../../renvooi/renvooi.interfaces";

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
  naam?: RenvooiValue | string;

  @Element()
  private host!: HTMLDsoAnnotationGebiedsaanwijzingElement;

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
        title={
          <>
            <span class="content">
              <dso-renvooi value={this.naam} />
            </span>
            {this.gewijzigdeLocatie && <AnnotationGewijzigdeLocatie />}
          </>
        }
      />
    );
  }
}
