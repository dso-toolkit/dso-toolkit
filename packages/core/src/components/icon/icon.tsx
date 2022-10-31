import { Component, h, Prop } from "@stencil/core";

import air from "@dso-toolkit/sources/src/icons/air.svg";
import angleDown from "@dso-toolkit/sources/src/icons/angle-down.svg";
import angleLeft from "@dso-toolkit/sources/src/icons/angle-left.svg";
import angleRight from "@dso-toolkit/sources/src/icons/angle-right.svg";
import angleUp from "@dso-toolkit/sources/src/icons/angle-up.svg";
import balloon from "@dso-toolkit/sources/src/icons/balloon.svg";
import bars from "@dso-toolkit/sources/src/icons/bars.svg";
import buildings from "@dso-toolkit/sources/src/icons/buildings.svg";
import calendar from "@dso-toolkit/sources/src/icons/calendar.svg";
import call from "@dso-toolkit/sources/src/icons/call.svg";
import caretDown from "@dso-toolkit/sources/src/icons/caret-down.svg";
import check from "@dso-toolkit/sources/src/icons/check.svg";
import checkCircle from "@dso-toolkit/sources/src/icons/check-circle.svg";
import chevronDown from "@dso-toolkit/sources/src/icons/chevron-down.svg";
import chevronLeft from "@dso-toolkit/sources/src/icons/chevron-left.svg";
import chevronRight from "@dso-toolkit/sources/src/icons/chevron-right.svg";
import chevronUp from "@dso-toolkit/sources/src/icons/chevron-up.svg";
import circleNotch from "@dso-toolkit/sources/src/icons/circle-notch.svg";
import clock from "@dso-toolkit/sources/src/icons/clock.svg";
import copy from "@dso-toolkit/sources/src/icons/copy.svg";
import crown from "@dso-toolkit/sources/src/icons/crown.svg";
import cultural from "@dso-toolkit/sources/src/icons/cultural.svg";
import document from "@dso-toolkit/sources/src/icons/document.svg";
import download from "@dso-toolkit/sources/src/icons/download.svg";
import email from "@dso-toolkit/sources/src/icons/email.svg";
import energy from "@dso-toolkit/sources/src/icons/energy.svg";
import environment from "@dso-toolkit/sources/src/icons/environment.svg";
import exclamation from "@dso-toolkit/sources/src/icons/exclamation.svg";
import externalLink from "@dso-toolkit/sources/src/icons/external-link.svg";
import eyeSlash from "@dso-toolkit/sources/src/icons/eye-slash.svg";
import eye from "@dso-toolkit/sources/src/icons/eye.svg";
import filter from "@dso-toolkit/sources/src/icons/filter.svg";
import forbidden from "@dso-toolkit/sources/src/icons/forbidden.svg";
import health from "@dso-toolkit/sources/src/icons/health.svg";
import helpActive from "@dso-toolkit/sources/src/icons/help-active.svg";
import help from "@dso-toolkit/sources/src/icons/help.svg";
import house from "@dso-toolkit/sources/src/icons/house.svg";
import infoActive from "@dso-toolkit/sources/src/icons/info-active.svg";
import infoI from "@dso-toolkit/sources/src/icons/info-i.svg";
import info from "@dso-toolkit/sources/src/icons/info.svg";
import infrastructure from "@dso-toolkit/sources/src/icons/infrastructure.svg";
import label from "@dso-toolkit/sources/src/icons/label.svg";
import land from "@dso-toolkit/sources/src/icons/land.svg";
import landscape from "@dso-toolkit/sources/src/icons/landscape.svg";
import layers from "@dso-toolkit/sources/src/icons/layers.svg";
import location from "@dso-toolkit/sources/src/icons/location.svg";
import locationOutline from "@dso-toolkit/sources/src/icons/location-outline.svg";
import locationSearch from "@dso-toolkit/sources/src/icons/location-search.svg";
import lock from "@dso-toolkit/sources/src/icons/lock.svg";
import magnet from "@dso-toolkit/sources/src/icons/magnet.svg";
import mapLocation from "@dso-toolkit/sources/src/icons/map-location.svg";
import marker from "@dso-toolkit/sources/src/icons/marker.svg";
import measurement from "@dso-toolkit/sources/src/icons/measurement.svg";
import minusSquare from "@dso-toolkit/sources/src/icons/minus-square.svg";
import minus from "@dso-toolkit/sources/src/icons/minus.svg";
import more from "@dso-toolkit/sources/src/icons/more.svg";
import municipality from "@dso-toolkit/sources/src/icons/municipality.svg";
import nature from "@dso-toolkit/sources/src/icons/nature.svg";
import newWindow from "@dso-toolkit/sources/src/icons/new-window.svg";
import paperclip from "@dso-toolkit/sources/src/icons/paperclip.svg";
import parking from "@dso-toolkit/sources/src/icons/parking.svg";
import pencil from "@dso-toolkit/sources/src/icons/pencil.svg";
import pin from "@dso-toolkit/sources/src/icons/pin.svg";
import pinOutline from "@dso-toolkit/sources/src/icons/pin-outline.svg";
import plusSquare from "@dso-toolkit/sources/src/icons/plus-square.svg";
import plus from "@dso-toolkit/sources/src/icons/plus.svg";
import print from "@dso-toolkit/sources/src/icons/print.svg";
import procedures from "@dso-toolkit/sources/src/icons/procedures.svg";
import redo from "@dso-toolkit/sources/src/icons/redo.svg";
import safety from "@dso-toolkit/sources/src/icons/safety.svg";
import search from "@dso-toolkit/sources/src/icons/search.svg";
import scale from "@dso-toolkit/sources/src/icons/scale.svg";
import sitemap from "@dso-toolkit/sources/src/icons/sitemap.svg";
import soil from "@dso-toolkit/sources/src/icons/soil.svg";
import sortAscending from "@dso-toolkit/sources/src/icons/sort-ascending.svg";
import sortDescending from "@dso-toolkit/sources/src/icons/sort-descending.svg";
import sort from "@dso-toolkit/sources/src/icons/sort.svg";
import sound from "@dso-toolkit/sources/src/icons/sound.svg";
import statusDanger from "@dso-toolkit/sources/src/icons/status-danger.svg";
import statusInfo from "@dso-toolkit/sources/src/icons/status-info.svg";
import statusSuccess from "@dso-toolkit/sources/src/icons/status-success.svg";
import statusWarning from "@dso-toolkit/sources/src/icons/status-warning.svg";
import table from "@dso-toolkit/sources/src/icons/table.svg";
import times from "@dso-toolkit/sources/src/icons/times.svg";
import trash from "@dso-toolkit/sources/src/icons/trash.svg";
import undo from "@dso-toolkit/sources/src/icons/undo.svg";
import userLine from "@dso-toolkit/sources/src/icons/user-line.svg";
import user from "@dso-toolkit/sources/src/icons/user.svg";
import users from "@dso-toolkit/sources/src/icons/users.svg";
import water from "@dso-toolkit/sources/src/icons/water.svg";
import wipWip from "@dso-toolkit/sources/src/icons/wip-wip.svg";

const icons = [
  { alias: "air", svg: air },
  { alias: "angle-down", svg: angleDown },
  { alias: "angle-left", svg: angleLeft },
  { alias: "angle-right", svg: angleRight },
  { alias: "angle-up", svg: angleUp },
  { alias: "balloon", svg: balloon },
  { alias: "bars", svg: bars },
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
  { alias: "location", svg: location },
  { alias: "location-outline", svg: locationOutline },
  { alias: "location-search", svg: locationSearch },
  { alias: "lock", svg: lock },
  { alias: "magnet", svg: magnet },
  { alias: "map-location", svg: mapLocation },
  { alias: "marker", svg: marker },
  { alias: "measurement", svg: measurement },
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
  { alias: "plus-square", svg: plusSquare },
  { alias: "plus", svg: plus },
  { alias: "print", svg: print },
  { alias: "procedures", svg: procedures },
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
  { alias: "status-info", svg: statusInfo },
  { alias: "status-success", svg: statusSuccess },
  { alias: "status-warning", svg: statusWarning },
  { alias: "table", svg: table },
  { alias: "times", svg: times },
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
