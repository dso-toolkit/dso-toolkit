import { Component, h, Prop } from "@stencil/core";

import air from "dso-toolkit/src/icons/air.svg";
import angleDown from "dso-toolkit/src/icons/angle-down.svg";
import angleLeft from "dso-toolkit/src/icons/angle-left.svg";
import angleRight from "dso-toolkit/src/icons/angle-right.svg";
import angleUp from "dso-toolkit/src/icons/angle-up.svg";
import asterisk from "dso-toolkit/src/icons/asterisk.svg";
import balloon from "dso-toolkit/src/icons/balloon.svg";
import bars from "dso-toolkit/src/icons/bars.svg";
import buildings from "dso-toolkit/src/icons/buildings.svg";
import calendar from "dso-toolkit/src/icons/calendar.svg";
import call from "dso-toolkit/src/icons/call.svg";
import caretDown from "dso-toolkit/src/icons/caret-down.svg";
import caretUp from "dso-toolkit/src/icons/caret-up.svg";
import check from "dso-toolkit/src/icons/check.svg";
import checkCircle from "dso-toolkit/src/icons/check-circle.svg";
import chevronDown from "dso-toolkit/src/icons/chevron-down.svg";
import chevronDownDouble from "dso-toolkit/src/icons/chevron-down-double.svg";
import chevronDownUp from "dso-toolkit/src/icons/chevron-down-up.svg";
import chevronLeft from "dso-toolkit/src/icons/chevron-left.svg";
import chevronRight from "dso-toolkit/src/icons/chevron-right.svg";
import chevronUp from "dso-toolkit/src/icons/chevron-up.svg";
import chevronUpDown from "dso-toolkit/src/icons/chevron-up-down.svg";
import chevronUpUp from "dso-toolkit/src/icons/chevron-up-up.svg";
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
import help from "dso-toolkit/src/icons/help.svg";
import helpActive from "dso-toolkit/src/icons/help-active.svg";
import home from "dso-toolkit/src/icons/home.svg";
import house from "dso-toolkit/src/icons/house.svg";
import info from "dso-toolkit/src/icons/info.svg";
import infoActive from "dso-toolkit/src/icons/info-active.svg";
import infoI from "dso-toolkit/src/icons/info-i.svg";
import infrastructure from "dso-toolkit/src/icons/infrastructure.svg";
import internet from "dso-toolkit/src/icons/internet.svg";
import label from "dso-toolkit/src/icons/label.svg";
import land from "dso-toolkit/src/icons/land.svg";
import landscape from "dso-toolkit/src/icons/landscape.svg";
import layers from "dso-toolkit/src/icons/layers.svg";
import location from "dso-toolkit/src/icons/location.svg";
import locationMap from "dso-toolkit/src/icons/location-map.svg";
import locationOutline from "dso-toolkit/src/icons/location-outline.svg";
import locationSearch from "dso-toolkit/src/icons/location-search.svg";
import lock from "dso-toolkit/src/icons/lock.svg";
import magnet from "dso-toolkit/src/icons/magnet.svg";
import mail from "dso-toolkit/src/icons/mail.svg";
import map from "dso-toolkit/src/icons/map.svg";
import mapLayers from "dso-toolkit/src/icons/map-layers.svg";
import mapLocation from "dso-toolkit/src/icons/map-location.svg";
import maps from "dso-toolkit/src/icons/maps.svg";
import marker from "dso-toolkit/src/icons/marker.svg";
import measurement from "dso-toolkit/src/icons/measurement.svg";
import minus from "dso-toolkit/src/icons/minus.svg";
import minusCircle from "dso-toolkit/src/icons/minus-circle.svg";
import minusSquare from "dso-toolkit/src/icons/minus-square.svg";
import more from "dso-toolkit/src/icons/more.svg";
import municipality from "dso-toolkit/src/icons/municipality.svg";
import nature from "dso-toolkit/src/icons/nature.svg";
import newWindow from "dso-toolkit/src/icons/new-window.svg";
import paperclip from "dso-toolkit/src/icons/paperclip.svg";
import parking from "dso-toolkit/src/icons/parking.svg";
import pause from "dso-toolkit/src/icons/pause.svg";
import pencil from "dso-toolkit/src/icons/pencil.svg";
import pending from "dso-toolkit/src/icons/pending.svg";
import pin from "dso-toolkit/src/icons/pin.svg";
import pinOutline from "dso-toolkit/src/icons/pin-outline.svg";
import play from "dso-toolkit/src/icons/play.svg";
import plus from "dso-toolkit/src/icons/plus.svg";
import plusCircle from "dso-toolkit/src/icons/plus-circle.svg";
import plusSquare from "dso-toolkit/src/icons/plus-square.svg";
import print from "dso-toolkit/src/icons/print.svg";
import procedures from "dso-toolkit/src/icons/procedures.svg";
import question from "dso-toolkit/src/icons/question.svg";
import redo from "dso-toolkit/src/icons/redo.svg";
import safety from "dso-toolkit/src/icons/safety.svg";
import scale from "dso-toolkit/src/icons/scale.svg";
import search from "dso-toolkit/src/icons/search.svg";
import security from "dso-toolkit/src/icons/security.svg";
import settings from "dso-toolkit/src/icons/settings.svg";
import sitemap from "dso-toolkit/src/icons/sitemap.svg";
import soil from "dso-toolkit/src/icons/soil.svg";
import sortAscending from "dso-toolkit/src/icons/sort-ascending.svg";
import sortDescending from "dso-toolkit/src/icons/sort-descending.svg";
import sort from "dso-toolkit/src/icons/sort.svg";
import sortDown from "dso-toolkit/src/icons/sort-down.svg";
import sortUp from "dso-toolkit/src/icons/sort-up.svg";
import sound from "dso-toolkit/src/icons/sound.svg";
import spinner from "dso-toolkit/src/icons/spinner.svg";
import statusDanger from "dso-toolkit/src/icons/status-danger.svg";
import statusError from "dso-toolkit/src/icons/status-error.svg";
import statusForbidden from "dso-toolkit/src/icons/status-forbidden.svg";
import statusInfo from "dso-toolkit/src/icons/status-info.svg";
import statusInfoNegative from "dso-toolkit/src/icons/status-info-negative.svg";
import statusSuccess from "dso-toolkit/src/icons/status-success.svg";
import statusWarning from "dso-toolkit/src/icons/status-warning.svg";
import statusWarningInline from "dso-toolkit/src/icons/status-warning-inline.svg";
import statusWarningInlineNegative from "dso-toolkit/src/icons/status-warning-inline-negative.svg";
import stop from "dso-toolkit/src/icons/stop.svg";
import table from "dso-toolkit/src/icons/table.svg";
import times from "dso-toolkit/src/icons/times.svg";
import trash from "dso-toolkit/src/icons/trash.svg";
import undo from "dso-toolkit/src/icons/undo.svg";
import user from "dso-toolkit/src/icons/user.svg";
import userLine from "dso-toolkit/src/icons/user-line.svg";
import users from "dso-toolkit/src/icons/users.svg";
import water from "dso-toolkit/src/icons/water.svg";
import weather from "dso-toolkit/src/icons/weather.svg";
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
  { alias: "buildings", svg: buildings },
  { alias: "calendar", svg: calendar },
  { alias: "call", svg: call },
  { alias: "caret-down", svg: caretDown },
  { alias: "caret-up", svg: caretUp },
  { alias: "check", svg: check },
  { alias: "check-circle", svg: checkCircle },
  { alias: "chevron-down", svg: chevronDown },
  { alias: "chevron-down-double", svg: chevronDownDouble },
  { alias: "chevron-down-up", svg: chevronDownUp },
  { alias: "chevron-left", svg: chevronLeft },
  { alias: "chevron-right", svg: chevronRight },
  { alias: "chevron-up", svg: chevronUp },
  { alias: "chevron-up-down", svg: chevronUpDown },
  { alias: "chevron-up-up", svg: chevronUpUp },
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
  { alias: "home", svg: home },
  { alias: "house", svg: house },
  { alias: "info", svg: info },
  { alias: "info-active", svg: infoActive },
  { alias: "info-i", svg: infoI },
  { alias: "infrastructure", svg: infrastructure },
  { alias: "internet", svg: internet },
  { alias: "label", svg: label },
  { alias: "land", svg: land },
  { alias: "landscape", svg: landscape },
  { alias: "layers", svg: layers },
  { alias: "location", svg: location },
  { alias: "location-map", svg: locationMap },
  { alias: "location-outline", svg: locationOutline },
  { alias: "location-search", svg: locationSearch },
  { alias: "lock", svg: lock },
  { alias: "magnet", svg: magnet },
  { alias: "mail", svg: mail },
  { alias: "map", svg: map },
  { alias: "map-layers", svg: mapLayers },
  { alias: "map-location", svg: mapLocation },
  { alias: "maps", svg: maps },
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
  { alias: "pause", svg: pause },
  { alias: "pencil", svg: pencil },
  { alias: "pending", svg: pending },
  { alias: "pin", svg: pin },
  { alias: "pin-outline", svg: pinOutline },
  { alias: "play", svg: play },
  { alias: "plus", svg: plus },
  { alias: "plus-circle", svg: plusCircle },
  { alias: "plus-square", svg: plusSquare },
  { alias: "print", svg: print },
  { alias: "procedures", svg: procedures },
  { alias: "question", svg: question },
  { alias: "spinner", svg: spinner },
  { alias: "redo", svg: redo },
  { alias: "safety", svg: safety },
  { alias: "scale", svg: scale },
  { alias: "search", svg: search },
  { alias: "security", svg: security },
  { alias: "settings", svg: settings },
  { alias: "sitemap", svg: sitemap },
  { alias: "soil", svg: soil },
  { alias: "sort-ascending", svg: sortAscending },
  { alias: "sort-descending", svg: sortDescending },
  { alias: "sort", svg: sort },
  { alias: "sort-down", svg: sortDown },
  { alias: "sort-up", svg: sortUp },
  { alias: "sound", svg: sound },
  { alias: "status-danger", svg: statusDanger },
  { alias: "status-error", svg: statusError },
  { alias: "status-forbidden", svg: statusForbidden },
  { alias: "status-info", svg: statusInfo },
  { alias: "status-info-negative", svg: statusInfoNegative },
  { alias: "status-success", svg: statusSuccess },
  { alias: "status-warning", svg: statusWarning },
  { alias: "status-warning-inline", svg: statusWarningInline },
  { alias: "status-warning-inline-negative", svg: statusWarningInlineNegative },
  { alias: "stop", svg: stop },
  { alias: "table", svg: table },
  { alias: "times", svg: times },
  { alias: "trash", svg: trash },
  { alias: "undo", svg: undo },
  { alias: "user-line", svg: userLine },
  { alias: "user", svg: user },
  { alias: "users", svg: users },
  { alias: "water", svg: water },
  { alias: "weather", svg: weather },
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
