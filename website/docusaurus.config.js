// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "DSO Toolkit",
  tagline: "Design System",
  url: "https://www.dso-toolkit.nl",
  baseUrl:
    process.env.CI && typeof process.env.TRAVIS_BRANCH === "string"
      ? `/${process.env.TRAVIS_BRANCH.replace(/#/, "_")}/beta/`
      : "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",
  favicon: "img/favicon.ico",
  i18n: {
    defaultLocale: "nl",
    locales: ["nl"],
  },
  plugins: ["docusaurus-plugin-sass"],
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/dso-toolkit/dso-toolkit/tree/master/website/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/dso-toolkit/dso-toolkit/tree/master/website/",
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
            title: "Docs",
            items: [
              {
                label: "Tutorial",
                to: "/docs/intro",
              },
            ],
          },
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
