import { LoggerService } from './logger.service';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { BasicService } from './basic.service';
import { VirtualTimeScheduler, asyncScheduler } from 'rxjs';
import { cold, getTestScheduler } from 'jasmine-marbles';
import { map, switchMap, mergeMap } from 'rxjs/operators';

// describe('BasicService', () => {
//   let service: BasicService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(BasicService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });

describe('BasicService', () => {

  let loggerService: LoggerService;
  let service: BasicService;

  beforeEach(() => {
    loggerService = {
      log: () => { }
    };

    spyOn(loggerService, 'log');

    service = new BasicService(loggerService);
  });

  it('should return a + b', () => {

    const result = service.plus(1, 3);
    expect(loggerService.log).toHaveBeenCalledTimes(1);

    expect(result).toEqual(4);
  });

  it('should emit 4 numbers', () => {

    const scheduler = new VirtualTimeScheduler();
    (asyncScheduler.constructor as any).delegate = scheduler;
    const res = [];

    service.getRange().subscribe(
      (num) => res.push(num),
      () => { },
      () => {
      }
    );

    scheduler.flush();
    expect(res).toEqual([0, 1, 2, 3]);
  });

  xit('should emit 4 numbers - fakeasync', fakeAsync(() => {
    const res = [];

    service.getRange().subscribe(
      (num) => res.push(num),
      () => { },
      () => {
      }
    );

    tick(1000);
    expect(res).toEqual([0, 1, 2, 3]);
  }));


  it('should emit 4 numbers - marbles', () => {

    const obs$ = cold('---x|', { x: [0, 1, 2, 3] });
    spyOn(service, 'getRange').and.returnValue(obs$);

    let res = [];

    service.getRange().subscribe(
      (num: any) => res = num,
      () => { },
      () => {
      }
    );

    getTestScheduler().flush();
    expect(res).toEqual([0, 1, 2, 3]);
  });

  it('rxjs map operator', () => {
    const obs$1 = cold('-a-b-c-|', { a: 1, b: 2, c: 3 });
    const expected = cold('-a-b-c-|', { a: 2, b: 3, c: 4 });


    const result = obs$1.pipe(map(x => x + 1));
    expect(result).toBeObservable(expected);
  });


  it('rxjs map operator', () => {
    const obs1$ = cold('-a-b-|', { a: 10, b: 20 });
    const obs2$ = cold('-a-a-a-|', { a: 10 });

    const expected = cold('--x-y-y-y-|', { x: 20, y: 30 });


    const result = obs1$.pipe(switchMap(x => obs2$.pipe(map(y => x + y))));
    expect(result).toBeObservable(expected);
  });

  fit('rxjs map operator', () => {
    const obs1$ = cold('-a-------a--|', { a: 10 });
    const obs2$ = cold('-b-b-b-|', { a: 20 });

    const expected = null;


    const result = obs1$.pipe(mergeMap(x => obs2$.pipe(map(y => x + y))));
    expect(result).toBeObservable(expected);
  });


});
