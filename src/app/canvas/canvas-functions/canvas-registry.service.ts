import { Injectable } from '@angular/core';
import { CanvasRegistry } from './canvas-registry';
import { dia } from '@joint/core';

@Injectable({
  providedIn: 'root',
})
export class CanvasRegistryService {
  private canvasRegistry!: CanvasRegistry;
  constructor() {}

  initializeRegistry(elements: (dia.Element | dia.Link)[]) {
    this.canvasRegistry = new CanvasRegistry(elements);
  }

  getRegistry() {
    return this.canvasRegistry;
  }
}
