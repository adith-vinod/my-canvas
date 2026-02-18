import { Component } from '@angular/core';
import { DndModule } from 'ngx-drag-drop'


@Component({
  selector: 'app-sidebar',
  imports: [DndModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  host:{
    class:'bg-light vh-100 w-100 d-block'
  }
})
export class SidebarComponent {

  data = [
    { 
      "text": "hi", 
      "position": { "x": 214, "y": 389 } 
    },
    { 
      "text": "hello", 
      "position": { "x": 76, "y": 142 } 
    },
    { 
      "text": "what's up", 
      "position": { "x": 331, "y": 508 } 
    }
  ]
  
  
  

}
