import * as React from "react";

import {
  Definition,
  DefinitionDescriptionContent,
  DefinitionDescriptionItems,
  DefinitionList,
  List,
  Type,
} from "dso-toolkit";

export function definitionListTemplate({ modifier, definitions }: DefinitionList<JSX.Element>) {
  function definitionTemplate({ term, descriptions }: Definition<JSX.Element>) {
    return (
      <>
        <dt>{term}</dt>
        {descriptions.map((description) => (
          <dd>{definitionContentTemplate(description)}</dd>
        ))}
      </>
    );
  }

  function definitionContentTemplate(
    description: DefinitionDescriptionContent<JSX.Element> | DefinitionDescriptionItems
  ) {
    if ("content" in description) {
      if (typeof description.content === "string") {
        return <div dangerouslySetInnerHTML={{ __html: description.content }} />;
      }

      return description.content;
    }

    return listTemplate(description.list);
  }

  return (
    <dl className={modifier}>
      {definitions.map((definition) =>
        modifier?.split(" ").includes("dso-columns") ? (
          <div>{definitionTemplate(definition)}</div>
        ) : (
          definitionTemplate(definition)
        )
      )}
    </dl>
  );
}

function ul(children: JSX.Element[], modifier?: string) {
  switch (modifier) {
    case "group":
      return <ul className="list-group">{children}</ul>;

    case "columns":
      return <ul className="dso-columns-list">{children}</ul>;

    case "img-list":
      return <ul className="dso-img-list">{children}</ul>;

    case "unstyled":
      return <ul className="dso-list-unstyled">{children}</ul>;
    default:
      return <ul>{children}</ul>;
  }
}

function ol(children: JSX.Element[], modifier?: string) {
  switch (modifier) {
    case "group":
      return <ol className="list-group">{children}</ol>;

    case "columns":
      return <ol className="dso-columns-list">{children}</ol>;

    case "img-list":
      return <ol className="dso-img-list">{children}</ol>;

    case "unstyled":
      return <ol className="dso-list-unstyled">{children}</ol>;
    default:
      return <ol>{children}</ol>;
  }
}

function listTemplate({ type, items, modifier }: List) {
  const children = items.map((item) => (
    <li className={modifier === "group" ? "list-group-item" : ""}>
      {modifier === "img-list" && (
        <>
          <img src={item.imgSrc} /> {item.text}
        </>
      )}
    </li>
  ));

  if (type === Type.Ol) {
    return ol(children, modifier);
  }

  return ul(children, modifier);
}
