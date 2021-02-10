'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-539341ef.js');

/*
 Stencil Client Patch Esm v2.3.0 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return index.promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return index.bootstrapLazy([["dso-alert_8.cjs",[[1,"dso-alert",{"status":[1]}],[1,"dso-attachments-counter",{"count":[2]}],[1,"dso-badge",{"status":[1]}],[1,"dso-highlight-box",{"yellow":[4],"border":[4],"white":[4],"dropShadow":[4,"drop-shadow"],"step":[2]}],[1,"dso-icon",{"icon":[1]}],[1,"dso-label",{"status":[1]}],[1,"dso-progress-bar",{"progress":[2],"min":[2],"max":[2]}],[1,"dso-whitebox",{"small":[4],"label":[1],"step":[2]}]]]], options);
  });
};

exports.defineCustomElements = defineCustomElements;
