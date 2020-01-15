import { FileService } from './file.service';
import { TestBed } from '@microgamma/digator/lib/lib/testing/test-bed';
import { EndpointMock } from '@microgamma/apigator';
import { getSingleton } from '@microgamma/digator';

describe('FileService', () => {

  let service: FileService;

  beforeEach(() => {
    new TestBed({
      providers: [
        EndpointMock(FileService)
      ]
    });

    service = getSingleton(FileService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();

  });
});