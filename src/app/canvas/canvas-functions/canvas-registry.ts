import { dia } from '@joint/core';

export interface SavePayload {
  added: SerializedNode[];
  deleted: SerializedNode[];
  updated: SerializedNode[];
}

export type SerializedNode = {
  id: string;
  text: string;
  position: {
    x: number;
    y: number;
  };
};

export class CanvasRegistry {
  private addedNodes: Map<string, dia.Element | dia.Link> = new Map();
  private updatedNodes: Map<string, dia.Element | dia.Link> = new Map();
  private deletedNodes: Map<string, dia.Element | dia.Link> = new Map();
  private elements!: Map<string, dia.Element | dia.Link>;
  constructor(canvasElements: (dia.Element | dia.Link)[]) {
    this.elements = new Map(
      canvasElements.map((ele) => [ele.id as string, ele])
    );
  }

  add(node: dia.Element) {
    const id = node.id as string;
    this.elements.set(id, node);
    this.addedNodes.set(id, node);
  }

  remove(node: dia.Element) {
    const id = node.id as string;
    this.elements.delete(id);
    if (this.addedNodes.has(id)) {
      this.addedNodes.delete(id);
      return;
    }

    this.updatedNodes.delete(id);
    this.deletedNodes.set(id, node);
  }

  update(node: dia.Element) {
    const id = node.id as string;
    if (this.deletedNodes.has(id)) {
      return;
    }
    this.elements.set(id, node);
    if (this.addedNodes.has(id)) {
      this.addedNodes.set(id, node);
      return;
    }
    this.updatedNodes.set(id, node);
  }

  get allNodesCount(): number {
    return this.elements.size;
  }

  get addedNodesCount(): number {
    return this.addedNodes.size;
  }

  get updatedNodesCount(): number {
    return this.updatedNodes.size;
  }

  get deletedNodesCount(): number {
    return this.deletedNodes.size;
  }

  get all(): Map<string, dia.Element | dia.Link> {
    return this.elements;
  }

  get added(): Map<string, dia.Element | dia.Link> {
    return this.addedNodes;
  }

  get updated(): Map<string, dia.Element | dia.Link> {
    return this.updatedNodes;
  }

  get deleted(): Map<string, dia.Element | dia.Link> {
    return this.deletedNodes;
  }

  extractData(elementMap: Map<string, dia.Element | dia.Link>) {
    let data: SerializedNode[] = [];

    elementMap.forEach((value) => {
      const { id, attributes } = value;
      const { text, position } = attributes;

      data.push({
        id: id as string,
        text,
        position,
      });
    });

    return data;
  }

  save(): SavePayload {
    return {
      added: this.extractData(this.addedNodes),
      updated: this.extractData(this.updatedNodes),
      deleted: this.extractData(this.deletedNodes),
    };
  }
}
