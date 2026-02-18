import { dia, shapes, util } from '@joint/core';

export class Block extends dia.Element {
  text!: string;
  override preinitialize(
    attributes?: dia.Element.Attributes | undefined,
    options?: any
  ): void {
    this.text = options?.text || 'Hi';
    this.markup = [
      {
        tagName: 'rect',
        selector: 'body',
      },
      {
        tagName: 'text',
        selector: 'label',
      },
    ];
  }
  override defaults(): Partial<dia.Element.Attributes> {
    return {
      ...super.defaults,
      type: 'examples.Block',
      size: {
        width: 100,
        height: 50,
      },
      attrs: {
        body: {
          fill: 'white',
          stroke: 'red',
          strokeWidth: 2,
          height: 50,
          width: 100,
        },
        label: {
          text: this.text,
          fill: 'black',
          x: 'calc(w/2)',
          y: 'calc(h/2)',
          textAnchor: 'middle',
          textVerticalAnchor: 'middle',
        },
      },
    };
  }
  
}
