import { DefinitionList, List } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";

export const definitionList: DefinitionList<TemplateResult> = {
  definitions: [
    {
      term: html`Description lists:`,
      descriptions: [
        {
          content: "A description list is perfect for defining terms.",
        },
      ],
    },
    {
      term: html`Euismod:`,
      descriptions: [
        {
          content: "Vestibulum id ligula porta felis euismod semper eget lacinia odio sem nec elit.",
        },
        {
          content: "Donec id elit non mi porta gravida at eget metus.",
        },
      ],
    },
    {
      term: html`Malesuada porta:`,
      descriptions: [
        {
          content: "Etiam porta sem malesuada magna mollis euismod.",
        },
      ],
    },
    {
      term: html`Felis euismod semper eget lacinia:`,
      descriptions: [
        {
          content:
            "Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.",
        },
      ],
    },
  ],
};

export const listGroup: List = {
  modifier: "group",
  items: [
    {
      text: "Cras justo odio",
    },
    {
      text: "Dapibus ac facilisis in",
    },
    {
      text: "Morbi leo risus",
    },
    {
      text: "Porta ac consectetur ac",
    },
    {
      text: "Vestibulum at eros",
    },
  ],
};
