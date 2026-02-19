import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  viewChild,
} from '@angular/core';
import { dia, shapes } from '@joint/core';
import { Block } from './canvas-elements/block';
import { DndDropEvent, DndDropzoneDirective } from 'ngx-drag-drop';
import { CanvasRegistry } from './canvas-functions/canvas-registry';
import { CanvasRegistryService } from './canvas-functions/canvas-registry.service';
import { CanvasService } from '../services/canvas.service';

@Component({
  selector: 'app-canvas',
  imports: [DndDropzoneDirective],
  templateUrl: './canvas.component.html',
  styleUrl: './canvas.component.scss',
})
export class CanvasComponent implements OnInit, AfterViewInit {
  private namespace = shapes;
  private graph = new dia.Graph({}, { cellNamespace: this.namespace });
  private canvasRegistryService = inject(CanvasRegistryService);
  private canvasService = inject(CanvasService);
  private canvasRegistry!: CanvasRegistry;

  canvasEl = viewChild<ElementRef>('canvas');
  paper!: dia.Paper;

  ngOnInit(): void {
    this.canvasService.getElements().subscribe((res) => {
      this.canvasRegistryService.initializeRegistry(res);
      if (res.length) {
        res.forEach((data) => {
          const element = new Block({}, data);
          const { position } = data;
          element.position(position.x, position.y);
          element.set('text', data.text);
          element.attr('label/text', data.text);
          element.addTo(this.graph);
        });
      }
      this.canvasRegistry = this.canvasRegistryService.getRegistry();
    });
  }
  ngAfterViewInit(): void {
    this.paper = new dia.Paper({
      el: document.getElementById('canvas'),
      model: this.graph,
      width: '100%',
      height: '100vh',
      gridSize: 10,
      drawGrid: true,
      cellViewNamespace: this.namespace,
    });
  }

  onDrop(dropEvent: DndDropEvent) {
    const { data, event } = dropEvent;
    const { clientX, clientY } = event;
    const rect = this.canvasEl()?.nativeElement.getBoundingClientRect();
    const { left, top } = rect;
    const x = clientX - left;
    const y = clientY - top;
    const element = new Block({}, data);
    element.position(x, y);
    element.set('text', data.text);
    element.attr('label/text', data.text);
    element.addTo(this.graph);
    this.canvasRegistry.add(element);
  }
}
