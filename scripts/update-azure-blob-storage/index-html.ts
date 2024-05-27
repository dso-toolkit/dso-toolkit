import { html } from "@lit-labs/ssr";

export function indexHtml(version: string) {
  return html`<!doctype html>
    <html>
      <head>
        <title>dso-toolkit.nl</title>
        <meta http-equiv="refresh" content="0; url=/${version}" />
      </head>
      <body></body>
    </html>`;
}
