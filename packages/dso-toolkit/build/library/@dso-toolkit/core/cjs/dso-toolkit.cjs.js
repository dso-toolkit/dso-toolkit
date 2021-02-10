'use strict';

const index = require('./index-539341ef.js');

/*
 Stencil Client Patch Browser v2.3.0 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = (typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('dso-toolkit.cjs.js', document.baseURI).href));
    const opts =  {};
    if ( importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return index.promiseResolve(opts);
};

patchBrowser().then(options => {
  return index.bootstrapLazy([["dso-alert_8.cjs",[[1,"dso-alert",{"status":[1]}],[1,"dso-attachments-counter",{"count":[2]}],[1,"dso-badge",{"status":[1]}],[1,"dso-highlight-box",{"yellow":[4],"border":[4],"white":[4],"dropShadow":[4,"drop-shadow"],"step":[2]}],[1,"dso-icon",{"icon":[1]}],[1,"dso-label",{"status":[1]}],[1,"dso-progress-bar",{"progress":[2],"min":[2],"max":[2]}],[1,"dso-whitebox",{"small":[4],"label":[1],"step":[2]}]]]], options);
});
