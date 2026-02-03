import { Component, Prop, h } from "@stencil/core";
// Start: import svg
import asterisk from "dso-toolkit/src/icons/asterisk.svg";
import balloonOutline from "dso-toolkit/src/icons/balloon-outline.svg";
import balloonSolid from "dso-toolkit/src/icons/balloon-solid.svg";
import bars from "dso-toolkit/src/icons/bars.svg";
import bell from "dso-toolkit/src/icons/bell.svg";
import buildings from "dso-toolkit/src/icons/buildings.svg";
import calendar from "dso-toolkit/src/icons/calendar.svg";
import call from "dso-toolkit/src/icons/call.svg";
import caretDown from "dso-toolkit/src/icons/caret-down.svg";
import caretUp from "dso-toolkit/src/icons/caret-up.svg";
import checkCircle from "dso-toolkit/src/icons/check-circle.svg";
import check from "dso-toolkit/src/icons/check.svg";
import chevronDownDown from "dso-toolkit/src/icons/chevron-down-down.svg";
import chevronDownUp from "dso-toolkit/src/icons/chevron-down-up.svg";
import chevronDown from "dso-toolkit/src/icons/chevron-down.svg";
import chevronLeft from "dso-toolkit/src/icons/chevron-left.svg";
import chevronRight from "dso-toolkit/src/icons/chevron-right.svg";
import chevronUpDown from "dso-toolkit/src/icons/chevron-up-down.svg";
import chevronUpUp from "dso-toolkit/src/icons/chevron-up-up.svg";
import chevronUp from "dso-toolkit/src/icons/chevron-up.svg";
import circleNotch from "dso-toolkit/src/icons/circle-notch.svg";
import clockOutline from "dso-toolkit/src/icons/clock-outline.svg";
import clockSolid from "dso-toolkit/src/icons/clock-solid.svg";
import copyOutline from "dso-toolkit/src/icons/copy-outline.svg";
import copySolid from "dso-toolkit/src/icons/copy-solid.svg";
import cross from "dso-toolkit/src/icons/cross.svg";
import crown from "dso-toolkit/src/icons/crown.svg";
import cultural from "dso-toolkit/src/icons/cultural.svg";
import documentPencil from "dso-toolkit/src/icons/document-pencil.svg";
import document from "dso-toolkit/src/icons/document.svg";
import download from "dso-toolkit/src/icons/download.svg";
import energy from "dso-toolkit/src/icons/energy.svg";
import environment from "dso-toolkit/src/icons/environment.svg";
import exclamation from "dso-toolkit/src/icons/exclamation.svg";
import externalLink from "dso-toolkit/src/icons/external-link.svg";
import eyeSlash from "dso-toolkit/src/icons/eye-slash.svg";
import eye from "dso-toolkit/src/icons/eye.svg";
import filter from "dso-toolkit/src/icons/filter.svg";
import forbidden from "dso-toolkit/src/icons/forbidden.svg";
import hammer from "dso-toolkit/src/icons/hammer.svg";
import health from "dso-toolkit/src/icons/health.svg";
import helpOutline from "dso-toolkit/src/icons/help-outline.svg";
import helpSolid from "dso-toolkit/src/icons/help-solid.svg";
import home from "dso-toolkit/src/icons/home.svg";
import infoI from "dso-toolkit/src/icons/info-i.svg";
import infoOutline from "dso-toolkit/src/icons/info-outline.svg";
import infoSolid from "dso-toolkit/src/icons/info-solid.svg";
import infrastructure from "dso-toolkit/src/icons/infrastructure.svg";
import internet from "dso-toolkit/src/icons/internet.svg";
import label from "dso-toolkit/src/icons/label.svg";
import land from "dso-toolkit/src/icons/land.svg";
import landscape from "dso-toolkit/src/icons/landscape.svg";
import layers from "dso-toolkit/src/icons/layers.svg";
import lightBulb from "dso-toolkit/src/icons/light-bulb.svg";
import locationOrange from "dso-toolkit/src/icons/location-orange.svg";
import locationSearch from "dso-toolkit/src/icons/location-search.svg";
import location from "dso-toolkit/src/icons/location.svg";
import lock from "dso-toolkit/src/icons/lock.svg";
import magnet from "dso-toolkit/src/icons/magnet.svg";
import mailOutline from "dso-toolkit/src/icons/mail-outline.svg";
import mailSolid from "dso-toolkit/src/icons/mail-solid.svg";
import mapLayers from "dso-toolkit/src/icons/map-layers.svg";
import mapLocation from "dso-toolkit/src/icons/map-location.svg";
import map from "dso-toolkit/src/icons/map.svg";
import marker from "dso-toolkit/src/icons/marker.svg";
import measurement from "dso-toolkit/src/icons/measurement.svg";
import minusCircleOutline from "dso-toolkit/src/icons/minus-circle-outline.svg";
import minusCircleSolid from "dso-toolkit/src/icons/minus-circle-solid.svg";
import minusSquareOutline from "dso-toolkit/src/icons/minus-square-outline.svg";
import minusSquareSolid from "dso-toolkit/src/icons/minus-square-solid.svg";
import minus from "dso-toolkit/src/icons/minus.svg";
import moreHorizontal from "dso-toolkit/src/icons/more-horizontal.svg";
import moreVertical from "dso-toolkit/src/icons/more-vertical.svg";
import municipality from "dso-toolkit/src/icons/municipality.svg";
import nature from "dso-toolkit/src/icons/nature.svg";
import newWindow from "dso-toolkit/src/icons/new-window.svg";
import paperclip from "dso-toolkit/src/icons/paperclip.svg";
import parking from "dso-toolkit/src/icons/parking.svg";
import pause from "dso-toolkit/src/icons/pause.svg";
import pencil from "dso-toolkit/src/icons/pencil.svg";
import pinOutline from "dso-toolkit/src/icons/pin-outline.svg";
import pin from "dso-toolkit/src/icons/pin.svg";
import play from "dso-toolkit/src/icons/play.svg";
import plusCircleOutline from "dso-toolkit/src/icons/plus-circle-outline.svg";
import plusCircleSolid from "dso-toolkit/src/icons/plus-circle-solid.svg";
import plusSquareOutline from "dso-toolkit/src/icons/plus-square-outline.svg";
import plusSquareSolid from "dso-toolkit/src/icons/plus-square-solid.svg";
import plus from "dso-toolkit/src/icons/plus.svg";
import postcard from "dso-toolkit/src/icons/postcard.svg";
import print from "dso-toolkit/src/icons/print.svg";
import question from "dso-toolkit/src/icons/question.svg";
import redo from "dso-toolkit/src/icons/redo.svg";
import scale from "dso-toolkit/src/icons/scale.svg";
import search from "dso-toolkit/src/icons/search.svg";
import security from "dso-toolkit/src/icons/security.svg";
import settings from "dso-toolkit/src/icons/settings.svg";
import share from "dso-toolkit/src/icons/share.svg";
import sitemap from "dso-toolkit/src/icons/sitemap.svg";
import soil from "dso-toolkit/src/icons/soil.svg";
import sortAscending from "dso-toolkit/src/icons/sort-ascending.svg";
import sortDescending from "dso-toolkit/src/icons/sort-descending.svg";
import sort from "dso-toolkit/src/icons/sort.svg";
import sound from "dso-toolkit/src/icons/sound.svg";
import spinner from "dso-toolkit/src/icons/spinner.svg";
import statusError from "dso-toolkit/src/icons/status-error.svg";
import statusForbidden from "dso-toolkit/src/icons/status-forbidden.svg";
import statusInfoOutline from "dso-toolkit/src/icons/status-info-outline.svg";
import statusInfoSolid from "dso-toolkit/src/icons/status-info-solid.svg";
import statusSuccess from "dso-toolkit/src/icons/status-success.svg";
import statusWarningRedOutline from "dso-toolkit/src/icons/status-warning-red-outline.svg";
import statusWarningRedSolid from "dso-toolkit/src/icons/status-warning-red-solid.svg";
import statusWarning from "dso-toolkit/src/icons/status-warning.svg";
import stop from "dso-toolkit/src/icons/stop.svg";
import tableOutline from "dso-toolkit/src/icons/table-outline.svg";
import tableSolid from "dso-toolkit/src/icons/table-solid.svg";
import toDoList from "dso-toolkit/src/icons/to-do-list.svg";
import trash from "dso-toolkit/src/icons/trash.svg";
import undo from "dso-toolkit/src/icons/undo.svg";
import userOutline from "dso-toolkit/src/icons/user-outline.svg";
import userSolid from "dso-toolkit/src/icons/user-solid.svg";
import users from "dso-toolkit/src/icons/users.svg";
import water from "dso-toolkit/src/icons/water.svg";
import weather from "dso-toolkit/src/icons/weather.svg";
import wip from "dso-toolkit/src/icons/wip.svg";

import { IconAlias } from "./icon.interfaces";
// End: import svg

const icons = [
  // Start: alias object
  { alias: "asterisk", svg: asterisk },
  { alias: "balloon-outline", svg: balloonOutline },
  { alias: "balloon-solid", svg: balloonSolid },
  { alias: "bars", svg: bars },
  { alias: "bell", svg: bell },
  { alias: "buildings", svg: buildings },
  { alias: "calendar", svg: calendar },
  { alias: "call", svg: call },
  { alias: "caret-down", svg: caretDown },
  { alias: "caret-up", svg: caretUp },
  { alias: "check", svg: check },
  { alias: "check-circle", svg: checkCircle },
  { alias: "chevron-down-down", svg: chevronDownDown },
  { alias: "chevron-down-up", svg: chevronDownUp },
  { alias: "chevron-down", svg: chevronDown },
  { alias: "chevron-left", svg: chevronLeft },
  { alias: "chevron-right", svg: chevronRight },
  { alias: "chevron-up-down", svg: chevronUpDown },
  { alias: "chevron-up-up", svg: chevronUpUp },
  { alias: "chevron-up", svg: chevronUp },
  { alias: "circle-notch", svg: circleNotch },
  { alias: "clock-outline", svg: clockOutline },
  { alias: "clock-solid", svg: clockSolid },
  { alias: "copy-outline", svg: copyOutline },
  { alias: "copy-solid", svg: copySolid },
  { alias: "cross", svg: cross },
  { alias: "crown", svg: crown },
  { alias: "cultural", svg: cultural },
  { alias: "document", svg: document },
  { alias: "document-pencil", svg: documentPencil },
  { alias: "download", svg: download },
  { alias: "mail-outline", svg: mailOutline },
  { alias: "mail-solid", svg: mailSolid },
  { alias: "energy", svg: energy },
  { alias: "environment", svg: environment },
  { alias: "exclamation", svg: exclamation },
  { alias: "external-link", svg: externalLink },
  { alias: "eye-slash", svg: eyeSlash },
  { alias: "eye", svg: eye },
  { alias: "filter", svg: filter },
  { alias: "forbidden", svg: forbidden },
  { alias: "hammer", svg: hammer },
  { alias: "health", svg: health },
  { alias: "help-solid", svg: helpSolid },
  { alias: "help-outline", svg: helpOutline },
  { alias: "home", svg: home },
  { alias: "info-solid", svg: infoSolid },
  { alias: "info-i", svg: infoI },
  { alias: "info-outline", svg: infoOutline },
  { alias: "infrastructure", svg: infrastructure },
  { alias: "internet", svg: internet },
  { alias: "label", svg: label },
  { alias: "land", svg: land },
  { alias: "landscape", svg: landscape },
  { alias: "layers", svg: layers },
  { alias: "light-bulb", svg: lightBulb },
  { alias: "location", svg: location },
  { alias: "location-orange", svg: locationOrange },
  { alias: "location-search", svg: locationSearch },
  { alias: "lock", svg: lock },
  { alias: "magnet", svg: magnet },
  { alias: "map", svg: map },
  { alias: "map-layers", svg: mapLayers },
  { alias: "map-location", svg: mapLocation },
  { alias: "marker", svg: marker },
  { alias: "measurement", svg: measurement },
  { alias: "minus-circle-outline", svg: minusCircleOutline },
  { alias: "minus-circle-solid", svg: minusCircleSolid },
  { alias: "minus-square-outline", svg: minusSquareOutline },
  { alias: "minus-square-solid", svg: minusSquareSolid },
  { alias: "minus", svg: minus },
  { alias: "more-horizontal", svg: moreHorizontal },
  { alias: "more-vertical", svg: moreVertical },
  { alias: "municipality", svg: municipality },
  { alias: "nature", svg: nature },
  { alias: "new-window", svg: newWindow },
  { alias: "paperclip", svg: paperclip },
  { alias: "parking", svg: parking },
  { alias: "pause", svg: pause },
  { alias: "pencil", svg: pencil },
  { alias: "pin", svg: pin },
  { alias: "pin-outline", svg: pinOutline },
  { alias: "play", svg: play },
  { alias: "plus-circle-outline", svg: plusCircleOutline },
  { alias: "plus-circle-solid", svg: plusCircleSolid },
  { alias: "plus-square-outline", svg: plusSquareOutline },
  { alias: "plus-square-solid", svg: plusSquareSolid },
  { alias: "plus", svg: plus },
  { alias: "postcard", svg: postcard },
  { alias: "print", svg: print },
  { alias: "question", svg: question },
  { alias: "spinner", svg: spinner },
  { alias: "redo", svg: redo },
  { alias: "scale", svg: scale },
  { alias: "search", svg: search },
  { alias: "security", svg: security },
  { alias: "settings", svg: settings },
  { alias: "share", svg: share },
  { alias: "sitemap", svg: sitemap },
  { alias: "soil", svg: soil },
  { alias: "sort-ascending", svg: sortAscending },
  { alias: "sort-descending", svg: sortDescending },
  { alias: "sort", svg: sort },
  { alias: "sound", svg: sound },
  { alias: "status-error", svg: statusError },
  { alias: "status-forbidden", svg: statusForbidden },
  { alias: "status-info-outline", svg: statusInfoOutline },
  { alias: "status-info-solid", svg: statusInfoSolid },
  { alias: "status-success", svg: statusSuccess },
  { alias: "status-warning", svg: statusWarning },
  { alias: "status-warning-red-outline", svg: statusWarningRedOutline },
  { alias: "status-warning-red-solid", svg: statusWarningRedSolid },
  { alias: "stop", svg: stop },
  { alias: "table-outline", svg: tableOutline },
  { alias: "table-solid", svg: tableSolid },
  { alias: "to-do-list", svg: toDoList },
  { alias: "trash", svg: trash },
  { alias: "undo", svg: undo },
  { alias: "user-outline", svg: userOutline },
  { alias: "user-solid", svg: userSolid },
  { alias: "users", svg: users },
  { alias: "water", svg: water },
  { alias: "weather", svg: weather },
  { alias: "wip", svg: wip },
  // End: alias object
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
  icon?: IconAlias;

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
