import { Component, Prop, h } from "@stencil/core";

// Start: import svg
import asterisk from "../../icons/asterisk.svg";
import balloonOutline from "../../icons/balloon-outline.svg";
import balloonSolid from "../../icons/balloon-solid.svg";
import bars from "../../icons/bars.svg";
import bell from "../../icons/bell.svg";
import buildings from "../../icons/buildings.svg";
import calendar from "../../icons/calendar.svg";
import call from "../../icons/call.svg";
import caretDown from "../../icons/caret-down.svg";
import caretUp from "../../icons/caret-up.svg";
import checkCircle from "../../icons/check-circle.svg";
import check from "../../icons/check.svg";
import chevronDownDown from "../../icons/chevron-down-down.svg";
import chevronDownUp from "../../icons/chevron-down-up.svg";
import chevronDown from "../../icons/chevron-down.svg";
import chevronLeft from "../../icons/chevron-left.svg";
import chevronRight from "../../icons/chevron-right.svg";
import chevronUpDown from "../../icons/chevron-up-down.svg";
import chevronUpUp from "../../icons/chevron-up-up.svg";
import chevronUp from "../../icons/chevron-up.svg";
import circleNotch from "../../icons/circle-notch.svg";
import clockOutline from "../../icons/clock-outline.svg";
import clockSolid from "../../icons/clock-solid.svg";
import copyOutline from "../../icons/copy-outline.svg";
import copySolid from "../../icons/copy-solid.svg";
import cross from "../../icons/cross.svg";
import crown from "../../icons/crown.svg";
import cultural from "../../icons/cultural.svg";
import documentPencil from "../../icons/document-pencil.svg";
import document from "../../icons/document.svg";
import download from "../../icons/download.svg";
import energy from "../../icons/energy.svg";
import environment from "../../icons/environment.svg";
import exclamation from "../../icons/exclamation.svg";
import externalLink from "../../icons/external-link.svg";
import eyeSlash from "../../icons/eye-slash.svg";
import eye from "../../icons/eye.svg";
import filter from "../../icons/filter.svg";
import forbidden from "../../icons/forbidden.svg";
import hammer from "../../icons/hammer.svg";
import health from "../../icons/health.svg";
import helpOutline from "../../icons/help-outline.svg";
import helpSolid from "../../icons/help-solid.svg";
import home from "../../icons/home.svg";
import infoI from "../../icons/info-i.svg";
import infoOutline from "../../icons/info-outline.svg";
import infoSolid from "../../icons/info-solid.svg";
import infrastructure from "../../icons/infrastructure.svg";
import internet from "../../icons/internet.svg";
import label from "../../icons/label.svg";
import land from "../../icons/land.svg";
import landscape from "../../icons/landscape.svg";
import layers from "../../icons/layers.svg";
import lightBulb from "../../icons/light-bulb.svg";
import locationOrange from "../../icons/location-orange.svg";
import locationSearch from "../../icons/location-search.svg";
import location from "../../icons/location.svg";
import lock from "../../icons/lock.svg";
import magnet from "../../icons/magnet.svg";
import mailOutline from "../../icons/mail-outline.svg";
import mailSolid from "../../icons/mail-solid.svg";
import mapLayers from "../../icons/map-layers.svg";
import mapLocation from "../../icons/map-location.svg";
import map from "../../icons/map.svg";
import marker from "../../icons/marker.svg";
import measurement from "../../icons/measurement.svg";
import minusCircleOutline from "../../icons/minus-circle-outline.svg";
import minusCircleSolid from "../../icons/minus-circle-solid.svg";
import minusSquareOutline from "../../icons/minus-square-outline.svg";
import minusSquareSolid from "../../icons/minus-square-solid.svg";
import minus from "../../icons/minus.svg";
import moreHorizontal from "../../icons/more-horizontal.svg";
import moreVertical from "../../icons/more-vertical.svg";
import municipality from "../../icons/municipality.svg";
import nature from "../../icons/nature.svg";
import newWindow from "../../icons/new-window.svg";
import paperclip from "../../icons/paperclip.svg";
import parking from "../../icons/parking.svg";
import pause from "../../icons/pause.svg";
import pencil from "../../icons/pencil.svg";
import pinOutline from "../../icons/pin-outline.svg";
import pin from "../../icons/pin.svg";
import play from "../../icons/play.svg";
import plusCircleOutline from "../../icons/plus-circle-outline.svg";
import plusCircleSolid from "../../icons/plus-circle-solid.svg";
import plusSquareOutline from "../../icons/plus-square-outline.svg";
import plusSquareSolid from "../../icons/plus-square-solid.svg";
import plus from "../../icons/plus.svg";
import postcard from "../../icons/postcard.svg";
import print from "../../icons/print.svg";
import question from "../../icons/question.svg";
import redo from "../../icons/redo.svg";
import scale from "../../icons/scale.svg";
import search from "../../icons/search.svg";
import security from "../../icons/security.svg";
import settings from "../../icons/settings.svg";
import share from "../../icons/share.svg";
import sitemap from "../../icons/sitemap.svg";
import soil from "../../icons/soil.svg";
import sortAscending from "../../icons/sort-ascending.svg";
import sortDescending from "../../icons/sort-descending.svg";
import sort from "../../icons/sort.svg";
import sound from "../../icons/sound.svg";
import spinner from "../../icons/spinner.svg";
import statusError from "../../icons/status-error.svg";
import statusForbidden from "../../icons/status-forbidden.svg";
import statusInfoOutline from "../../icons/status-info-outline.svg";
import statusInfoSolid from "../../icons/status-info-solid.svg";
import statusSuccess from "../../icons/status-success.svg";
import statusWarningRedOutline from "../../icons/status-warning-red-outline.svg";
import statusWarningRedSolid from "../../icons/status-warning-red-solid.svg";
import statusWarning from "../../icons/status-warning.svg";
import stop from "../../icons/stop.svg";
import tableOutline from "../../icons/table-outline.svg";
import tableSolid from "../../icons/table-solid.svg";
import toDoList from "../../icons/to-do-list.svg";
import trash from "../../icons/trash.svg";
import undo from "../../icons/undo.svg";
import userOutline from "../../icons/user-outline.svg";
import userSolid from "../../icons/user-solid.svg";
import users from "../../icons/users.svg";
import water from "../../icons/water.svg";
import weather from "../../icons/weather.svg";
import wip from "../../icons/wip.svg";

import { IconAlias } from "./icon.interfaces";

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
  { alias: "check-circle", svg: checkCircle },
  { alias: "check", svg: check },
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
  { alias: "document-pencil", svg: documentPencil },
  { alias: "document", svg: document },
  { alias: "download", svg: download },
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
  { alias: "help-outline", svg: helpOutline },
  { alias: "help-solid", svg: helpSolid },
  { alias: "home", svg: home },
  { alias: "info-i", svg: infoI },
  { alias: "info-outline", svg: infoOutline },
  { alias: "info-solid", svg: infoSolid },
  { alias: "infrastructure", svg: infrastructure },
  { alias: "internet", svg: internet },
  { alias: "label", svg: label },
  { alias: "land", svg: land },
  { alias: "landscape", svg: landscape },
  { alias: "layers", svg: layers },
  { alias: "light-bulb", svg: lightBulb },
  { alias: "location-orange", svg: locationOrange },
  { alias: "location-search", svg: locationSearch },
  { alias: "location", svg: location },
  { alias: "lock", svg: lock },
  { alias: "magnet", svg: magnet },
  { alias: "mail-outline", svg: mailOutline },
  { alias: "mail-solid", svg: mailSolid },
  { alias: "map-layers", svg: mapLayers },
  { alias: "map-location", svg: mapLocation },
  { alias: "map", svg: map },
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
  { alias: "pin-outline", svg: pinOutline },
  { alias: "pin", svg: pin },
  { alias: "play", svg: play },
  { alias: "plus-circle-outline", svg: plusCircleOutline },
  { alias: "plus-circle-solid", svg: plusCircleSolid },
  { alias: "plus-square-outline", svg: plusSquareOutline },
  { alias: "plus-square-solid", svg: plusSquareSolid },
  { alias: "plus", svg: plus },
  { alias: "postcard", svg: postcard },
  { alias: "print", svg: print },
  { alias: "question", svg: question },
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
  { alias: "spinner", svg: spinner },
  { alias: "status-error", svg: statusError },
  { alias: "status-forbidden", svg: statusForbidden },
  { alias: "status-info-outline", svg: statusInfoOutline },
  { alias: "status-info-solid", svg: statusInfoSolid },
  { alias: "status-success", svg: statusSuccess },
  { alias: "status-warning-red-outline", svg: statusWarningRedOutline },
  { alias: "status-warning-red-solid", svg: statusWarningRedSolid },
  { alias: "status-warning", svg: statusWarning },
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
        console.warn(`Unknown svg: ${this.icon}`);
        return;
      }

      return <span class="icon-container" innerHTML={icon.svg} />;
    }
  }
}
