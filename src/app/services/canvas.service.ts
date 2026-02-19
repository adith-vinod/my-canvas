import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { SerializedNode } from '../canvas/canvas-functions/canvas-registry';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CanvasService {
  private http = inject(HttpClient);

  constructor() {}

  saveElements(elements: SerializedNode[]) {
    return this.http.post(`${environment.JSON_SERVER}/elements`, elements[0]);
  }

  getElements():Observable<any[]> {
    return this.http.get<any[]> (`${environment.JSON_SERVER}/elements`);
  }

  updateElement(element: SerializedNode) {
    return this.http.patch(
      `${environment.JSON_SERVER}/elements/:${element.id}`,
      element
    );
  }

  deleteElement(element: SerializedNode) {
    return this.http.delete(
      `${environment.JSON_SERVER}/elements/:${element.id}`
    );
  }
}
