import { Fragment, h } from '@stencil/core';

import { OzonContentAlNode } from './nodes/al.node';
import { OzonContentDocumentNode } from './nodes/document.node';
import { OzonContentExtRefNode } from './nodes/ext-ref.node';
import { OzonContentIllustratieNode } from './nodes/illustratie.node';
import { OzonContentInhoudNode } from './nodes/inhoud.node';
import { OzonContentOpschriftNode } from './nodes/opschrift.node';
import { OzonContentInlineNodes } from './nodes/inline.nodes';
import { OzonContentIntRefNode } from './nodes/int-ref.node';
import { OzonContentNootNode } from './nodes/noot.node';
import { OzonContentTableNode } from './nodes/table.node';
import { OzonContentTextNode } from './nodes/text.node';

import { getNodeName } from './get-node-name.function';
import { OzonContentNode } from './ozon-content-node.interface';
import { OzonContentContext } from './ozon-content-context.interface';
import { OzonContentFallbackNode } from './nodes/fallback.node';

export class Mapper {
  private cache: { xml: string, document: Document } | undefined;

  private mappers: OzonContentNode[] = [
    new OzonContentTextNode(),
    new OzonContentDocumentNode(),
    new OzonContentInhoudNode(),
    new OzonContentOpschriftNode(),
    new OzonContentIntRefNode(),
    new OzonContentExtRefNode(),
    new OzonContentAlNode(),
    new OzonContentInlineNodes(),
    new OzonContentIllustratieNode(),
    new OzonContentNootNode(),
    new OzonContentTableNode()
  ];

  private skip = this.mappers.reduce<string[]>((t, m) => {
    if (m.handles) {
      t.push(...m.handles)
    }

    return t;
  }, []);

  private fallbackNode = new OzonContentFallbackNode();

  private domParser = new DOMParser();

  private findMapper(name: string): OzonContentNode | undefined {
    if (this.skip.includes(name)) {
      return undefined;
    }

    return this.mappers.find(m => {
      if (Array.isArray(m.name)) {
        return m.name.includes(name);
      }

      return m.name === name;
    }) ?? this.fallbackNode;
  }

  mapNodeToJsx(node: Node | Node[] | NodeList, context: OzonContentContext, path: Node[]): JSX.Element {
    if (node instanceof NodeList) {
      return <Fragment>{Array.from(node).map(n => this.mapNodeToJsx(n, context, path))}</Fragment>
    }

    if (Array.isArray(node)) {
      return <Fragment>{node.map(n => this.mapNodeToJsx(n, context, path))}</Fragment>
    }

    const nodeName = getNodeName(node);
    const mapper = this.findMapper(nodeName);
    if (!mapper) {
      return <Fragment />;
    }

    const identity = mapper.identify?.(node);

    const state = identity ? context.state[identity] : undefined;
    const setState = identity ? (state: unknown) => context.setState({ ...context.state, [identity]: state }) : undefined;

    return mapper.render(node, {
      mapNodeToJsx: n => this.mapNodeToJsx(n, context, [...path, node]),
      emitAnchorClick: context.emitAnchorClick,
      setState,
      state,
      path
    });
  }

  transform(xml: string, context: OzonContentContext): JSX.Element {
    if (!this.cache || this.cache.xml !== xml) {
      this.cache = { xml, document: this.domParser.parseFromString(xml, 'text/xml') };
    }

    const xmlDocument = this.cache.document;

    return this.mapNodeToJsx(xmlDocument.getRootNode(), context, []);
  }
}
