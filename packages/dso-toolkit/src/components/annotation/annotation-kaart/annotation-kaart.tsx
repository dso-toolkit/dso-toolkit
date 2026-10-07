import { Component, ComponentInterface, Event, EventEmitter, Prop, h } from "@stencil/core";

import { isModifiedEvent } from "../../../utils/is-modified-event";
import { RenvooiValue } from "../../renvooi/renvooi.interfaces";
import { AnnotationBody } from "../annotation-body";
import { AnnotationWijzigactie } from "../annotation.interfaces";

import { AnnotationKaartClickEvent } from "./annotation-kaart.interfaces";

@Component({
  tag: "dso-annotation-kaart",
  styleUrl: "../annotation.scss",
  shadow: true,
})
export class AnnotationKaart implements ComponentInterface {
  /**
   * Een optionele wijzigactie die aangeeft of de annotatie is toegevoegd of verwijderd.
   */
  @Prop({ reflect: true })
  wijzigactie?: AnnotationWijzigactie;

  /**
   * De naam van de kaart.
   */
  @Prop()
  naam?: RenvooiValue | string;

  /**
   * De url naar de kaart.
   *
   * Gebruik het event `dsoClick` om de navigatie aan de router te koppelen.
   */
  @Prop({ reflect: true })
  href?: string;

  /**
   * Event als de gebruiker de kaartnaam selecteert.
   *
   * Let op "isModifiedEvent" om te bepalen of de navigatieactie door de router of de browser moet worden afgehandeld.
   */
  @Event({ bubbles: false })
  dsoClick!: EventEmitter<AnnotationKaartClickEvent>;

  private clickHandler = (e: MouseEvent): void => {
    if (!this.href) {
      return;
    }

    this.dsoClick.emit({
      href: this.href,
      originalEvent: e,
      isModifiedEvent: isModifiedEvent(e),
    });
  };

  render() {
    const title = this.href ? (
      <a class="content" href={this.href} onClick={this.clickHandler}>
        <dso-renvooi value={this.naam} />
      </a>
    ) : (
      <span class="content">
        <dso-renvooi value={this.naam} />
      </span>
    );

    return <AnnotationBody symbol={<dso-icon icon="land" />} title={title} />;
  }
}
