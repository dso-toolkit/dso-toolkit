import { AlertType, Tile } from "@dso-toolkit/sources";
import { html } from "lit-html";

import { tileGridTemplate } from "@dso-toolkit/css/src/components/tile-grid/tile-grid.template";
import { tileTemplate } from "@dso-toolkit/css/src/components/tile/tile.template";
import { alertTemplate } from '@dso-toolkit/core/src/components/alert/alert.template';
import { viewerGridTemplate } from '@dso-toolkit/core/src/components/viewer-grid/viewer-grid.template';

export function tilesExampleTemplate(tiles: Tile[]) {
  return viewerGridTemplate({
    main: html`
      <h2>Thema's</h2>
      <p>Bekijk regels en beleid rond een bepaald thema.</p>
      ${tileGridTemplate({ children: html`${tiles.map(tile => tileTemplate(tile))}` })}
    `,
    map: alertTemplate({ message: 'Dit is de kaart', status: AlertType.Info })
  });
};
