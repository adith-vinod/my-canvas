import { dia, shapes, util } from '@joint/core';

export class Block extends dia.Element {
  text!: string;
  override preinitialize(
    attributes?: dia.Element.Attributes | undefined,
    options?: any
  ): void {
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
        height: 100,
      },
      attrs: {
        body: {
          fill: 'white',
          stroke: 'red',
          strokeWidth: 2,
          height: 100,
          width: 100,
        },
        label: {
          fill: 'black',
          x: 'calc(w/2)',
          y: 'calc(h/2)',
          textAnchor: 'middle',
          textVerticalAnchor: 'middle',
        },
      },
      ports:{
       groups:{
        in:inputPortGroup,
        out:outputPortGroup
       }
      }
    };
  }
  
}


const inputPortGroup = {
  position: {
    name: 'left'
  },
  attrs: {
    portBody: {
      magnet: true,
      r:8,
      cx:0,
      cy:0,
      fill: '#44A194'
    },
    label: {
      fill: 'black'
    }
  },
  markup: [
    {
      tagName: 'circle',
      selector: 'portBody'
    }
  ],
  label: {
    position: {
      name: 'left'
    }
  }
};

const outputPortGroup = {
  position: {
    name: 'right'
  },
  attrs: {
    portBody: {
      magnet: true,
      r:8,
      cx:0,
      cy:0,
      fill: '#EC8F8D'
    },
    label: {
      fill: 'black'
    }
  },
  markup: [
    {
      tagName: 'circle',
      selector: 'portBody'
    }
  ],
  label: {
    position: {
      name: 'right'
    }
  }
};

