import { Component, inject } from '@angular/core';
import { CanvasService } from '../services/canvas.service';
import { CanvasRegistryService } from '../canvas/canvas-functions/canvas-registry.service';

@Component({
  selector: 'app-canvas-navbar',
  imports: [],
  templateUrl: './canvas-navbar.component.html',
  styleUrl: './canvas-navbar.component.scss',
})
export class CanvasNavbarComponent {
  canvasService = inject(CanvasService);
  canvasRegistryService = inject(CanvasRegistryService);

  save() {
    const savePayload = this.canvasRegistryService.getRegistry().save();
    this.canvasService.saveElements(savePayload.added).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    });
  }
}
