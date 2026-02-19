import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { SerializedNode } from '../canvas/canvas-functions/canvas-registry';
import {
  bufferCount,
  flatMap,
  forkJoin,
  from,
  mergeMap,
  Observable,
  of,
} from 'rxjs';

interface ParallelPayload<T> {
  elements: T[];
  callBack: (element: T) => Observable<any>;
}

@Injectable({
  providedIn: 'root',
})
export class CanvasService {
  private http = inject(HttpClient);

  constructor() {}

  private runInParallel({
    elements,
    callBack,
  }: ParallelPayload<SerializedNode>) {
    return from(elements).pipe(mergeMap((element) => callBack(element), 3));
  }

  saveElements(elements: SerializedNode[]) {
    return this.runInParallel({
      elements,
      callBack: (element) =>
        this.http.post(`${environment.JSON_SERVER}/elements`, element),
    });
  }

  getElements(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.JSON_SERVER}/elements`);
  }

  updateElement(elements: SerializedNode[]) {
    return this.runInParallel({
      elements,
      callBack: (element) =>
        this.http.patch(
          `${environment.JSON_SERVER}/elements/:${element.id}`,
          element
        ),
    });
  }

  deleteElement(elements: SerializedNode[]) {
    return this.runInParallel({
      elements,
      callBack: (element) =>
        this.http.delete(
          `${environment.JSON_SERVER}/elements/:${element.id}`
        )
    });
  }
}
