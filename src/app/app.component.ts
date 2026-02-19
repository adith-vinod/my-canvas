import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CanvasComponent } from "./canvas/canvas.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { CanvasNavbarComponent } from "./canvas-navbar/canvas-navbar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CanvasComponent, SidebarComponent, CanvasNavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'my-canvas';
}
