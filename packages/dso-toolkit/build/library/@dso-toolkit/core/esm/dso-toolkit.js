import { p as promiseResolve, b as bootstrapLazy } from './index-0562a5f1.js';

/*
 Stencil Client Patch Browser v2.3.0 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = import.meta.url;
    const opts =  {};
    if ( importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return promiseResolve(opts);
};

patchBrowser().then(options => {
  return bootstrapLazy([["dso-alert_8",[[1,"dso-alert",{"status":[1]}],[1,"dso-attachments-counter",{"count":[2]}],[1,"dso-badge",{"status":[1]}],[1,"dso-highlight-box",{"yellow":[4],"border":[4],"white":[4],"dropShadow":[4,"drop-shadow"],"step":[2]}],[1,"dso-icon",{"icon":[1]}],[1,"dso-label",{"status":[1]}],[1,"dso-progress-bar",{"progress":[2],"min":[2],"max":[2]}],[1,"dso-whitebox",{"small":[4],"label":[1],"step":[2]}]]]], options);
});
