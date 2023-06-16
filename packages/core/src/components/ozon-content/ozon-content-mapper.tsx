import { Fragment, h, JSX } from "@stencil/core";

import { getNodeName } from "./get-node-name.function";
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
import { OzonContentOpschriftNode } from "./nodes/opschrift.node";
import { OzonContentTableNode } from "./nodes/table.node";
import { OzonContentTextNode } from "./nodes/text.node";
import { OzonContentVerwijderdeTekstNode } from "./nodes/verwijderde-tekst.node";
import { OzonContentContext } from "./ozon-content-context.interface";
import { OzonContentNode } from "./ozon-content-node.interface";

export class Mapper {
  private cache: { xml: string; document: Document } | undefined;

  private mappers: OzonContentNode[] = [
    new OzonContentTextNode(),
    new OzonContentDocumentNode(),
    new OzonContentInhoudNode(),
    new OzonContentOpschriftNode(),
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

  private domParser = new DOMParser();

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
      return <Fragment>{Array.from(node).map((n) => this.mapNodeToJsx(n, context, path))}</Fragment>;
    }

    if (Array.isArray(node)) {
      return <Fragment>{node.map((n) => this.mapNodeToJsx(n, context, path))}</Fragment>;
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
      mapNodeToJsx: (n) => this.mapNodeToJsx(n, context, [...path, node]),
      emitAnchorClick: context.emitAnchorClick,
      setState,
      state,
      path,
    });
  }

  transform(xml: string, context: OzonContentContext): JSX.Element {
    if (!this.cache || this.cache.xml !== xml) {
      this.cache = { xml, document: this.domParser.parseFromString(xml, "text/xml") };
    }

    const xmlDocument = this.cache.document;

    return this.mapNodeToJsx(xmlDocument.getRootNode(), context, []);
  }
}
