import { Component, h, Prop } from '@stencil/core';

import air from '@dso-toolkit/styling/icons/air.svg';
import angleDown from '@dso-toolkit/styling/icons/angle-down.svg';
import angleLeft from '@dso-toolkit/styling/icons/angle-left.svg';
import angleRight from '@dso-toolkit/styling/icons/angle-right.svg';
import angleUp from '@dso-toolkit/styling/icons/angle-up.svg';
import balloon from '@dso-toolkit/styling/icons/balloon.svg';
import bars from '@dso-toolkit/styling/icons/bars.svg';
import buildings from '@dso-toolkit/styling/icons/buildings.svg';
import calendar from '@dso-toolkit/styling/icons/calendar.svg';
import caretDown from '@dso-toolkit/styling/icons/caret-down.svg';
import check from '@dso-toolkit/styling/icons/check.svg';
import chevronDown from '@dso-toolkit/styling/icons/chevron-down.svg';
import chevronLeft from '@dso-toolkit/styling/icons/chevron-left.svg';
import chevronRight from '@dso-toolkit/styling/icons/chevron-right.svg';
import chevronUp from '@dso-toolkit/styling/icons/chevron-up.svg';
import circleNotch from '@dso-toolkit/styling/icons/circle-notch.svg';
import clock from '@dso-toolkit/styling/icons/clock.svg';
import copy from '@dso-toolkit/styling/icons/copy.svg';
import crown from '@dso-toolkit/styling/icons/crown.svg';
import cultural from '@dso-toolkit/styling/icons/cultural.svg';
import download from '@dso-toolkit/styling/icons/download.svg';
import email from '@dso-toolkit/styling/icons/email.svg';
import exclamation from '@dso-toolkit/styling/icons/exclamation.svg';
import externalLink from '@dso-toolkit/styling/icons/external-link.svg';
import eyeSlash from '@dso-toolkit/styling/icons/eye-slash.svg';
import eye from '@dso-toolkit/styling/icons/eye.svg';
import filter from '@dso-toolkit/styling/icons/filter.svg';
import forbidden from '@dso-toolkit/styling/icons/forbidden.svg';
import house from '@dso-toolkit/styling/icons/house.svg';
import infoActive from '@dso-toolkit/styling/icons/info-active.svg';
import infoI from '@dso-toolkit/styling/icons/info-i.svg';
import info from '@dso-toolkit/styling/icons/info.svg';
import infrastructure from '@dso-toolkit/styling/icons/infrastructure.svg';
import label from '@dso-toolkit/styling/icons/label.svg';
import landscape from '@dso-toolkit/styling/icons/landscape.svg';
import location from '@dso-toolkit/styling/icons/location.svg';
import lock from '@dso-toolkit/styling/icons/lock.svg';
import magnet from '@dso-toolkit/styling/icons/magnet.svg';
import mapLocation from '@dso-toolkit/styling/icons/map-location.svg';
import marker from '@dso-toolkit/styling/icons/marker.svg';
import measurement from '@dso-toolkit/styling/icons/measurement.svg';
import minusSquare from '@dso-toolkit/styling/icons/minus-square.svg';
import more from '@dso-toolkit/styling/icons/more.svg';
import municipality from '@dso-toolkit/styling/icons/municipality.svg';
import nature from '@dso-toolkit/styling/icons/nature.svg';
import paperclip from '@dso-toolkit/styling/icons/paperclip.svg';
import parking from '@dso-toolkit/styling/icons/parking.svg';
import pencil from '@dso-toolkit/styling/icons/pencil.svg';
import pin from '@dso-toolkit/styling/icons/pin.svg';
import plusSquare from '@dso-toolkit/styling/icons/plus-square.svg';
import plus from '@dso-toolkit/styling/icons/plus.svg';
import print from '@dso-toolkit/styling/icons/print.svg';
import redo from '@dso-toolkit/styling/icons/redo.svg';
import search from '@dso-toolkit/styling/icons/search.svg';
import sitemap from '@dso-toolkit/styling/icons/sitemap.svg';
import soil from '@dso-toolkit/styling/icons/soil.svg';
import sortAscending from '@dso-toolkit/styling/icons/sort-ascending.svg';
import sortDescending from '@dso-toolkit/styling/icons/sort-descending.svg';
import sort from '@dso-toolkit/styling/icons/sort.svg';
import statusDanger from '@dso-toolkit/styling/icons/status-danger.svg';
import statusInfo from '@dso-toolkit/styling/icons/status-info.svg';
import statusSuccess from '@dso-toolkit/styling/icons/status-success.svg';
import statusWarning from '@dso-toolkit/styling/icons/status-warning.svg';
import table from '@dso-toolkit/styling/icons/table.svg';
import times from '@dso-toolkit/styling/icons/times.svg';
import trash from '@dso-toolkit/styling/icons/trash.svg';
import undo from '@dso-toolkit/styling/icons/undo.svg';
import userLine from '@dso-toolkit/styling/icons/user-line.svg';
import user from '@dso-toolkit/styling/icons/user.svg';
import users from '@dso-toolkit/styling/icons/users.svg';
import water from '@dso-toolkit/styling/icons/water.svg';
import wipWip from '@dso-toolkit/styling/icons/wip-wip.svg';

const icons = [
  { alias: 'air', svg: air },
  { alias: 'angle-down', svg: angleDown },
  { alias: 'angle-left', svg: angleLeft },
  { alias: 'angle-right', svg: angleRight },
  { alias: 'angle-up', svg: angleUp },
  { alias: 'balloon', svg: balloon },
  { alias: 'bars', svg: bars },
  { alias: 'buildings', svg: buildings },
  { alias: 'calendar', svg: calendar },
  { alias: 'caret-down', svg: caretDown },
  { alias: 'check', svg: check },
  { alias: 'chevron-down', svg: chevronDown },
  { alias: 'chevron-left', svg: chevronLeft },
  { alias: 'chevron-right', svg: chevronRight },
  { alias: 'chevron-up', svg: chevronUp },
  { alias: 'circle-notch', svg: circleNotch },
  { alias: 'clock', svg: clock },
  { alias: 'copy', svg: copy },
  { alias: 'crown', svg: crown },
  { alias: 'cultural', svg: cultural },
  { alias: 'download', svg: download },
  { alias: 'email', svg: email },
  { alias: 'exclamation', svg: exclamation },
  { alias: 'external-link', svg: externalLink },
  { alias: 'eye-slash', svg: eyeSlash },
  { alias: 'eye', svg: eye },
  { alias: 'filter', svg: filter },
  { alias: 'forbidden', svg: forbidden },
  { alias: 'house', svg: house },
  { alias: 'info-active', svg: infoActive },
  { alias: 'info-i', svg: infoI },
  { alias: 'info', svg: info },
  { alias: 'infrastructure', svg: infrastructure },
  { alias: 'label', svg: label },
  { alias: 'landscape', svg: landscape },
  { alias: 'location', svg: location },
  { alias: 'lock', svg: lock },
  { alias: 'magnet', svg: magnet },
  { alias: 'map-location', svg: mapLocation },
  { alias: 'marker', svg: marker },
  { alias: 'measurement', svg: measurement },
  { alias: 'minus-square', svg: minusSquare },
  { alias: 'more', svg: more },
  { alias: 'municipality', svg: municipality },
  { alias: 'nature', svg: nature },
  { alias: 'paperclip', svg: paperclip },
  { alias: 'parking', svg: parking },
  { alias: 'pencil', svg: pencil },
  { alias: 'pin', svg: pin },
  { alias: 'plus-square', svg: plusSquare },
  { alias: 'plus', svg: plus },
  { alias: 'print', svg: print },
  { alias: 'redo', svg: redo },
  { alias: 'search', svg: search },
  { alias: 'sitemap', svg: sitemap },
  { alias: 'soil', svg: soil },
  { alias: 'sort-ascending', svg: sortAscending },
  { alias: 'sort-descending', svg: sortDescending },
  { alias: 'sort', svg: sort },
  { alias: 'status-danger', svg: statusDanger },
  { alias: 'status-info', svg: statusInfo },
  { alias: 'status-success', svg: statusSuccess },
  { alias: 'status-warning', svg: statusWarning },
  { alias: 'table', svg: table },
  { alias: 'times', svg: times },
  { alias: 'trash', svg: trash },
  { alias: 'undo', svg: undo },
  { alias: 'user-line', svg: userLine },
  { alias: 'user', svg: user },
  { alias: 'users', svg: users },
  { alias: 'water', svg: water },
  { alias: 'wip-wip', svg: wipWip }
];

@Component({
  tag: 'dso-icon',
  styleUrl: './icon.scss',
  shadow: true
})
export class Icon {
  @Prop()
  icon!: string;

  render() {
    const icon = icons.find(i => i.alias === this.icon);
    if (!icon) {
      throw new TypeError(`Unknown svg: ${this.icon}`);
    }

    return <span class="icon-container" innerHTML={icon.svg} />
  }
}
