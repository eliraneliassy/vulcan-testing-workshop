import { LoggerService } from './logger.service';
import { TestBed } from '@angular/core/testing';

import { BasicService } from './basic.service';

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

  beforeEach(() => {
    loggerService = {
      log: () => { }
    };
  });

  it('should return a + b', () => {

    spyOn(loggerService, 'log');

    const service = new BasicService(loggerService);

    const result = service.plus(1, 3);
    expect(loggerService.log).toHaveBeenCalledTimes(1);

    expect(result).toEqual(4);
  });
});
