import { Fragment, h, JSX } from "@stencil/core";

import { getNodeName } from "./get-node-name.function";
import { OzonContentAbbrNode } from "./nodes/abbr.node";
import { OzonContentAlNode } from "./nodes/al.node";
import { OzonContentBronNode } from "./nodes/bron.node";
import { OzonContentDocumentNode } from "./nodes/document.node";
import { OzonContentExtRefNode } from "./nodes/ext-ref.node";
import { OzonContentFallbackNode } from "./nodes/fallback.node";
import { OzonContentFiguurNode } from "./nodes/figuur.node";
import { OzonContentInhoudNode } from "./nodes/inhoud.node";
import { OzonContentInlineTekstAfbeeldingNode } from "./nodes/inline-tekst-afbeelding.node";
import { OzonContentInlineNodes } from "./nodes/inline.nodes";
import { OzonContentIntIoRefNode } from "./nodes/int-io-ref.node";
import { OzonContentIntRefNode } from "./nodes/int-ref.node";
import { OzonContentLijstNode } from "./nodes/lijst.node";
import { OzonContentNieuweTekstNode } from "./nodes/nieuwe-tekst.node";
import { OzonContentNootNode } from "./nodes/noot.node";
import { OzonContentKopNode } from "./nodes/kop.node";
import { OzonContentTableNode } from "./nodes/table.node";
import { OzonContentTextNode } from "./nodes/text.node";
import { OzonContentVerwijderdeTekstNode } from "./nodes/verwijderde-tekst.node";
import { OzonContentContext } from "./ozon-content-context.interface";
import { OzonContentNode } from "./ozon-content-node.interface";
import { OzonContentInputType } from "./ozon-content.interfaces";

export class Mapper {
  private mappers: OzonContentNode[] = [
    new OzonContentAbbrNode(),
    new OzonContentTextNode(),
    new OzonContentDocumentNode(),
    new OzonContentInhoudNode(),
    new OzonContentKopNode(),
    new OzonContentIntRefNode(),
    new OzonContentExtRefNode(),
    new OzonContentAlNode(),
    new OzonContentInlineNodes(),
    new OzonContentInlineTekstAfbeeldingNode(),
    new OzonContentNootNode(),
    new OzonContentTableNode(),
    new OzonContentIntIoRefNode(),
    new OzonContentFiguurNode(),
    new OzonContentLijstNode(),
    new OzonContentBronNode(),
    new OzonContentNieuweTekstNode(),
    new OzonContentVerwijderdeTekstNode(),
  ];

  private skip = this.mappers.reduce<string[]>((t, m) => {
    if (m.handles) {
      t.push(...m.handles);
    }

    return t;
  }, []);

  private fallbackNode = new OzonContentFallbackNode();

  private domParser?: DOMParser;

  private findMapper(name: string): OzonContentNode | undefined {
    if (this.skip.includes(name)) {
      return undefined;
    }

    return (
      this.mappers.find((m) => {
        if (Array.isArray(m.name)) {
          return m.name.includes(name);
        }

        return m.name === name;
      }) ?? this.fallbackNode
    );
  }

  mapNodeToJsx(node: Node | Node[] | NodeList, context: OzonContentContext, path: Node[]): JSX.Element {
    if (node instanceof NodeList) {
      return (
        <Fragment>
          {Array.from(node).map((n, index) => {
            return (
              <>
                {context.addSpaceBeforeNode && index > 0 && " "}
                {this.mapNodeToJsx(n, context, path)}
              </>
            );
          })}
        </Fragment>
      );
    }

    if (Array.isArray(node)) {
      return (
        <Fragment>
          {node.map((n, index) => {
            return (
              <>
                {context.addSpaceBeforeNode && index > 0 && " "}
                {this.mapNodeToJsx(n, context, path)}
              </>
            );
          })}
        </Fragment>
      );
    }

    const nodeName = getNodeName(node);
    const mapper = this.findMapper(nodeName);
    if (!mapper) {
      return <Fragment />;
    }

    const identity = mapper.identify?.(node);

    const state = identity ? context.state[identity] : undefined;
    const setState = identity ? (s: unknown) => context.setState({ ...context.state, [identity]: s }) : undefined;

    return mapper.render(node, {
      inline: context.inline,
      mark: context.mark,
      mapNodeToJsx: (n) => this.mapNodeToJsx(n, context, [...path, node]),
      emitAnchorClick: context.emitAnchorClick,
      setState,
      emitMarkItemHighlight: context.emitMarkItemHighlight,
      state,
      path,
      urlResolver: context.urlResolver,
    });
  }

  transform(input: OzonContentInputType | undefined, context: OzonContentContext): JSX.Element {
    if (!input) {
      return <Fragment />;
    }

    const document = this.inputToXmlDocument(input);
    if (document.querySelector("parsererror")) {
      console.error({
        message: "[DSO Toolkit: Ozon Content Mapper] Unable to parse XML",
        context,
        input,
        document,
      });

      return <Fragment />;
    }

    return this.mapNodeToJsx(document.getRootNode(), context, []);
  }

  private inputToXmlDocument(input: OzonContentInputType): XMLDocument {
    if (input instanceof XMLDocument) {
      return input;
    }

    if (typeof input === "string") {
      this.domParser ??= new DOMParser();

      return this.domParser.parseFromString(input, "text/xml");
    }

    return document.implementation.createDocument(null, null);
  }
}
