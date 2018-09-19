// @flow

import React, {type Node as ReactNode} from "react";

import {
  Graph,
  NodeAddress,
  type NodeAddressT,
  EdgeAddress,
} from "../../core/graph";
import type {Assets} from "../assets";
import type {Repo} from "../../core/repo";

import type {StaticPluginAdapter, DynamicPluginAdapter} from "./pluginAdapter";

export const FALLBACK_NAME = "FALLBACK_ADAPTER";

export const fallbackNodeType = Object.freeze({
  name: "node",
  pluralName: "nodes",
  prefix: NodeAddress.empty,
  defaultWeight: 1,
});

export const fallbackEdgeType = Object.freeze({
  forwardName: "forward edge",
  backwardName: "backward edge",
  defaultForwardWeight: 1,
  defaultBackwardWeight: 1,
  prefix: EdgeAddress.empty,
});

export class FallbackStaticAdapter implements StaticPluginAdapter {
  name() {
    return FALLBACK_NAME;
  }

  nodePrefix() {
    return NodeAddress.empty;
  }

  edgePrefix() {
    return EdgeAddress.empty;
  }

  nodeTypes() {
    return [fallbackNodeType];
  }

  edgeTypes() {
    return [fallbackEdgeType];
  }

  load(_unused_assets: Assets, _unused_repo: Repo) {
    return Promise.resolve(
      (new FallbackDynamicAdapter(): DynamicPluginAdapter)
    );
  }
}

export class FallbackNodeDescription extends React.Component<{|
  +address: NodeAddressT,
|}> {
  render() {
    return NodeAddress.toString(this.props.address);
  }
}

export class FallbackDynamicAdapter implements DynamicPluginAdapter {
  graph() {
    return new Graph();
  }

  nodeDescription() {
    return FallbackNodeDescription;
  }

  static() {
    return new FallbackStaticAdapter();
  }
}
