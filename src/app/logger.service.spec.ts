import { TestBed } from '@angular/core/testing';

import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let service: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggerService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log', () => {
    const st = 'some log msg';
    console.log = jasmine.createSpy('log');

    service.log(st);

    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith(st);

  });
});
