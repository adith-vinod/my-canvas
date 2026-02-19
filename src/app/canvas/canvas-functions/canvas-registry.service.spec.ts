import { TestBed } from '@angular/core/testing';

import { CanvasRegistryService } from './canvas-registry.service';

describe('CanvasRegistryService', () => {
  let service: CanvasRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanvasRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
