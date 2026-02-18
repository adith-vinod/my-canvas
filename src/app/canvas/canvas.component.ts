import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  viewChild,
} from '@angular/core';
import { dia, shapes } from '@joint/core';
import { Block } from './canvas-utils/block';
import { DndDropEvent, DndDropzoneDirective } from 'ngx-drag-drop';

@Component({
  selector: 'app-canvas',
  imports: [DndDropzoneDirective],
  templateUrl: './canvas.component.html',
  styleUrl: './canvas.component.scss',
})
export class CanvasComponent implements AfterViewInit {
  private namespace = shapes;
  private graph = new dia.Graph({}, { cellNamespace: this.namespace });
  canvasEl = viewChild<ElementRef>('canvas');
  paper!: dia.Paper;

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
    const element = new Block({}, data);
    const x = clientX - left;
    const y = clientY - top;
    element.position(x, y);
    element.addTo(this.graph);
  }
}
