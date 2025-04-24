import { Component, h, Prop } from "@stencil/core";

import air from "dso-toolkit/src/icons/air.svg";
import angleDown from "dso-toolkit/src/icons/angle-down.svg";
import angleLeft from "dso-toolkit/src/icons/angle-left.svg";
import angleRight from "dso-toolkit/src/icons/angle-right.svg";
import angleUp from "dso-toolkit/src/icons/angle-up.svg";
import asterisk from "dso-toolkit/src/icons/asterisk.svg";
import balloon from "dso-toolkit/src/icons/balloon.svg";
import bars from "dso-toolkit/src/icons/bars.svg";
import bell from "dso-toolkit/src/icons/bell.svg";
import buildings from "dso-toolkit/src/icons/buildings.svg";
import calendar from "dso-toolkit/src/icons/calendar.svg";
import call from "dso-toolkit/src/icons/call.svg";
import caretDown from "dso-toolkit/src/icons/caret-down.svg";
import check from "dso-toolkit/src/icons/check.svg";
import checkCircle from "dso-toolkit/src/icons/check-circle.svg";
import chevronDown from "dso-toolkit/src/icons/chevron-down.svg";
import chevronLeft from "dso-toolkit/src/icons/chevron-left.svg";
import chevronRight from "dso-toolkit/src/icons/chevron-right.svg";
import chevronUp from "dso-toolkit/src/icons/chevron-up.svg";
import circleNotch from "dso-toolkit/src/icons/circle-notch.svg";
import clock from "dso-toolkit/src/icons/clock.svg";
import copy from "dso-toolkit/src/icons/copy.svg";
import crown from "dso-toolkit/src/icons/crown.svg";
import cultural from "dso-toolkit/src/icons/cultural.svg";
import document from "dso-toolkit/src/icons/document.svg";
import download from "dso-toolkit/src/icons/download.svg";
import email from "dso-toolkit/src/icons/email.svg";
import energy from "dso-toolkit/src/icons/energy.svg";
import environment from "dso-toolkit/src/icons/environment.svg";
import exclamation from "dso-toolkit/src/icons/exclamation.svg";
import externalLink from "dso-toolkit/src/icons/external-link.svg";
import eyeSlash from "dso-toolkit/src/icons/eye-slash.svg";
import eye from "dso-toolkit/src/icons/eye.svg";
import filter from "dso-toolkit/src/icons/filter.svg";
import forbidden from "dso-toolkit/src/icons/forbidden.svg";
import health from "dso-toolkit/src/icons/health.svg";
import helpActive from "dso-toolkit/src/icons/help-active.svg";
import help from "dso-toolkit/src/icons/help.svg";
import house from "dso-toolkit/src/icons/house.svg";
import infoActive from "dso-toolkit/src/icons/info-active.svg";
import infoI from "dso-toolkit/src/icons/info-i.svg";
import info from "dso-toolkit/src/icons/info.svg";
import infrastructure from "dso-toolkit/src/icons/infrastructure.svg";
import label from "dso-toolkit/src/icons/label.svg";
import land from "dso-toolkit/src/icons/land.svg";
import landscape from "dso-toolkit/src/icons/landscape.svg";
import layers from "dso-toolkit/src/icons/layers.svg";
import lightBulb from "dso-toolkit/src/icons/light-bulb.svg";
import location from "dso-toolkit/src/icons/location.svg";
import locationOutline from "dso-toolkit/src/icons/location-outline.svg";
import locationSearch from "dso-toolkit/src/icons/location-search.svg";
import lock from "dso-toolkit/src/icons/lock.svg";
import magnet from "dso-toolkit/src/icons/magnet.svg";
import mail from "dso-toolkit/src/icons/mail.svg";
import mapLayers from "dso-toolkit/src/icons/map-layers.svg";
import mapLocation from "dso-toolkit/src/icons/map-location.svg";
import marker from "dso-toolkit/src/icons/marker.svg";
import measurement from "dso-toolkit/src/icons/measurement.svg";
import minusCircle from "dso-toolkit/src/icons/minus-circle.svg";
import minusSquare from "dso-toolkit/src/icons/minus-square.svg";
import minus from "dso-toolkit/src/icons/minus.svg";
import more from "dso-toolkit/src/icons/more.svg";
import municipality from "dso-toolkit/src/icons/municipality.svg";
import nature from "dso-toolkit/src/icons/nature.svg";
import newWindow from "dso-toolkit/src/icons/new-window.svg";
import paperclip from "dso-toolkit/src/icons/paperclip.svg";
import parking from "dso-toolkit/src/icons/parking.svg";
import pencil from "dso-toolkit/src/icons/pencil.svg";
import pin from "dso-toolkit/src/icons/pin.svg";
import pinOutline from "dso-toolkit/src/icons/pin-outline.svg";
import plusCircle from "dso-toolkit/src/icons/plus-circle.svg";
import plusSquare from "dso-toolkit/src/icons/plus-square.svg";
import plus from "dso-toolkit/src/icons/plus.svg";
import print from "dso-toolkit/src/icons/print.svg";
import procedures from "dso-toolkit/src/icons/procedures.svg";
import redo from "dso-toolkit/src/icons/redo.svg";
import safety from "dso-toolkit/src/icons/safety.svg";
import search from "dso-toolkit/src/icons/search.svg";
import scale from "dso-toolkit/src/icons/scale.svg";
import sitemap from "dso-toolkit/src/icons/sitemap.svg";
import soil from "dso-toolkit/src/icons/soil.svg";
import sortAscending from "dso-toolkit/src/icons/sort-ascending.svg";
import sortDescending from "dso-toolkit/src/icons/sort-descending.svg";
import sort from "dso-toolkit/src/icons/sort.svg";
import sound from "dso-toolkit/src/icons/sound.svg";
import spinner from "dso-toolkit/src/icons/spinner.svg";
import statusError from "dso-toolkit/src/icons/status-error.svg";
import statusDanger from "dso-toolkit/src/icons/status-danger.svg";
import statusInfo from "dso-toolkit/src/icons/status-info.svg";
import statusSuccess from "dso-toolkit/src/icons/status-success.svg";
import statusWarning from "dso-toolkit/src/icons/status-warning.svg";
import statusWarningInline from "dso-toolkit/src/icons/status-warning-inline.svg";
import statusWarningInlineNegative from "dso-toolkit/src/icons/status-warning-inline-negative.svg";
import table from "dso-toolkit/src/icons/table.svg";
import times from "dso-toolkit/src/icons/times.svg";
import toDoList from "dso-toolkit/src/icons/to-do-list.svg";
import trash from "dso-toolkit/src/icons/trash.svg";
import undo from "dso-toolkit/src/icons/undo.svg";
import userLine from "dso-toolkit/src/icons/user-line.svg";
import user from "dso-toolkit/src/icons/user.svg";
import users from "dso-toolkit/src/icons/users.svg";
import water from "dso-toolkit/src/icons/water.svg";
import wipWip from "dso-toolkit/src/icons/wip-wip.svg";

const icons = [
  { alias: "air", svg: air },
  { alias: "angle-down", svg: angleDown },
  { alias: "angle-left", svg: angleLeft },
  { alias: "angle-right", svg: angleRight },
  { alias: "angle-up", svg: angleUp },
  { alias: "asterisk", svg: asterisk },
  { alias: "balloon", svg: balloon },
  { alias: "bars", svg: bars },
  { alias: "bell", svg: bell },
  { alias: "buildings", svg: buildings },
  { alias: "calendar", svg: calendar },
  { alias: "call", svg: call },
  { alias: "caret-down", svg: caretDown },
  { alias: "check", svg: check },
  { alias: "check-circle", svg: checkCircle },
  { alias: "chevron-down", svg: chevronDown },
  { alias: "chevron-left", svg: chevronLeft },
  { alias: "chevron-right", svg: chevronRight },
  { alias: "chevron-up", svg: chevronUp },
  { alias: "circle-notch", svg: circleNotch },
  { alias: "clock", svg: clock },
  { alias: "copy", svg: copy },
  { alias: "crown", svg: crown },
  { alias: "cultural", svg: cultural },
  { alias: "document", svg: document },
  { alias: "download", svg: download },
  { alias: "email", svg: email },
  { alias: "energy", svg: energy },
  { alias: "environment", svg: environment },
  { alias: "exclamation", svg: exclamation },
  { alias: "external-link", svg: externalLink },
  { alias: "eye-slash", svg: eyeSlash },
  { alias: "eye", svg: eye },
  { alias: "filter", svg: filter },
  { alias: "forbidden", svg: forbidden },
  { alias: "health", svg: health },
  { alias: "help-active", svg: helpActive },
  { alias: "help", svg: help },
  { alias: "house", svg: house },
  { alias: "info-active", svg: infoActive },
  { alias: "info-i", svg: infoI },
  { alias: "info", svg: info },
  { alias: "infrastructure", svg: infrastructure },
  { alias: "label", svg: label },
  { alias: "land", svg: land },
  { alias: "landscape", svg: landscape },
  { alias: "layers", svg: layers },
  { alias: "light-bulb", svg: lightBulb },
  { alias: "location", svg: location },
  { alias: "location-outline", svg: locationOutline },
  { alias: "location-search", svg: locationSearch },
  { alias: "lock", svg: lock },
  { alias: "magnet", svg: magnet },
  { alias: "mail", svg: mail },
  { alias: "map-layers", svg: mapLayers },
  { alias: "map-location", svg: mapLocation },
  { alias: "marker", svg: marker },
  { alias: "measurement", svg: measurement },
  { alias: "minus-circle", svg: minusCircle },
  { alias: "minus-square", svg: minusSquare },
  { alias: "minus", svg: minus },
  { alias: "more", svg: more },
  { alias: "municipality", svg: municipality },
  { alias: "nature", svg: nature },
  { alias: "new-window", svg: newWindow },
  { alias: "paperclip", svg: paperclip },
  { alias: "parking", svg: parking },
  { alias: "pencil", svg: pencil },
  { alias: "pin", svg: pin },
  { alias: "pin-outline", svg: pinOutline },
  { alias: "plus-circle", svg: plusCircle },
  { alias: "plus-square", svg: plusSquare },
  { alias: "plus", svg: plus },
  { alias: "print", svg: print },
  { alias: "procedures", svg: procedures },
  { alias: "spinner", svg: spinner },
  { alias: "redo", svg: redo },
  { alias: "safety", svg: safety },
  { alias: "scale", svg: scale },
  { alias: "search", svg: search },
  { alias: "sitemap", svg: sitemap },
  { alias: "soil", svg: soil },
  { alias: "sort-ascending", svg: sortAscending },
  { alias: "sort-descending", svg: sortDescending },
  { alias: "sort", svg: sort },
  { alias: "sound", svg: sound },
  { alias: "status-danger", svg: statusDanger },
  { alias: "status-error", svg: statusError },
  { alias: "status-info", svg: statusInfo },
  { alias: "status-success", svg: statusSuccess },
  { alias: "status-warning", svg: statusWarning },
  { alias: "status-warning-inline", svg: statusWarningInline },
  { alias: "status-warning-inline-negative", svg: statusWarningInlineNegative },
  { alias: "table", svg: table },
  { alias: "times", svg: times },
  { alias: "to-do-list", svg: toDoList },
  { alias: "trash", svg: trash },
  { alias: "undo", svg: undo },
  { alias: "user-line", svg: userLine },
  { alias: "user", svg: user },
  { alias: "users", svg: users },
  { alias: "water", svg: water },
  { alias: "wip-wip", svg: wipWip },
];

@Component({
  tag: "dso-icon",
  styleUrl: "./icon.scss",
  shadow: true,
})
export class Icon {
  /**
   * The alias of the icon.
   */
  @Prop()
  icon?: string;

  render() {
    if (this.icon) {
      const icon = icons.find((i) => i.alias === this.icon);
      if (!icon) {
        throw new TypeError(`Unknown svg: ${this.icon}`);
      }

      return <span class="icon-container" innerHTML={icon.svg} />;
    }
  }
}
