// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { resolve, dirname } = require("path");

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

function getVersion() {
  if (process.env.CI) {
    if (typeof process.env.TRAVIS_BRANCH === "string") {
      return process.env.TRAVIS_BRANCH.replace(/#/, "_");
    }

    if (typeof process.env.TRAVIS_TAG === "string" && process.env.TRAVIS_TAG[0] === "v") {
      return process.env.TRAVIS_TAG.substring(1);
    }
  }

  return undefined;
}

function getBaseUrl() {
  if (!process.env.CI) {
    return "/";
  }

  const version = getVersion();

  return version ? `/${version}/` : undefined;
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "DSO Toolkit",
  tagline: "Design System",
  url: "https://www.dso-toolkit.nl",
  baseUrl: getBaseUrl() ?? "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",
  favicon: "favicon.ico",
  i18n: {
    defaultLocale: "nl",
    locales: ["nl"],
  },
  staticDirectories: [resolve(dirname(require.resolve("dso-toolkit/package.json")), "assets"), "static"],
  plugins: ["docusaurus-plugin-sass"],
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          routeBasePath: "/",
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/dso-toolkit/dso-toolkit/tree/master/website/",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: "all",
          },
        },
        theme: {
          customCss: require.resolve("./src/css/custom.scss"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "DSO Toolkit",
        logo: {
          alt: "",
          src: "img/logo.png",
        },
        items: [
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "Documentatie",
          },
          { to: "/blog", label: "Blog", position: "left" },
          {
            href: `https://storybook.dso-toolkit.nl/${getVersion() ?? "master"}`,
            label: "Storybook",
            position: "left",
          },
          {
            type: "custom-dsoVersionSelector",
            position: "right",
          },
          {
            href: "https://github.com/dso-toolkit/dso-toolkit",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Community",
            items: [
              {
                label: "Slack",
                href: "https://dso-toolkit.slack.com/",
              },
              {
                label: "Slack invite link",
                href: "https://join.slack.com/t/dso-toolkit/shared_invite/zt-58125gbo-FtPAARcnU47rMgkT7KWikA",
              },
              {
                label: "GitHub issues",
                href: "https://github.com/dso-toolkit/dso-toolkit/issues",
              },
            ],
          },
          {
            title: "NPM",
            items: [
              {
                label: "dso-toolkit",
                href: "https://www.npmjs.com/package/dso-toolkit",
              },
              {
                label: "@dso-toolkit/core",
                href: "https://www.npmjs.com/package/@dso-toolkit/core",
              },
              {
                label: "@dso-toolkit/angular",
                href: "https://www.npmjs.com/package/@dso-toolkit/angular",
              },
              {
                label: "@dso-toolkit/react",
                href: "https://www.npmjs.com/package/@dso-toolkit/react",
              },
              {
                label: "@dso-toolkit/leaflet",
                href: "https://www.npmjs.com/package/@dso-toolkit/leaflet",
              },
              {
                label: "@dso-toolkit/react-leaflet",
                href: "https://www.npmjs.com/package/@dso-toolkit/react-leaflet",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Blog",
                to: "/blog",
              },
              {
                label: "GitHub",
                href: "https://github.com/dso-toolkit/dso-toolkit",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} DSO Toolkit. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
