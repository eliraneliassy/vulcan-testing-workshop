import { ITEMS_MOCK } from './items.mock';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { FeedService } from './feed.service';
import { Item } from './item.interface';
import { HttpErrorResponse } from '@angular/common/http';

describe('FeedService', () => {
  let service: FeedService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(FeedService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get feed', () => {

    const mock: Item[] = ITEMS_MOCK;

    service.getFeed()
      .subscribe((items: Item[]) => {
        expect(items).toBeTruthy();
        expect(items.length).toEqual(12);
        expect(items[0]._id).toEqual(mock[0]._id);
      });

    const req = httpController.expectOne('http://localhost:4700/feed');

    expect(req.request.method).toEqual('GET');

    req.flush(mock);

  });

  it('should test network error', () => {
    service.getFeed().subscribe(
      () => fail(),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(500);
        expect(error.error.message).toEqual('Internal Server Error');
      }
    );

    const req = httpController.expectOne('http://localhost:4700/feed');

    const err = new ErrorEvent('server error', { message: 'Internal Server Error' })

    req.error(err, { status: 500 });
  });

  afterEach(() => {
    httpController.verify();
  });
});
