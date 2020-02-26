import { LoggerService } from './logger.service';
import { Injectable } from '@angular/core';
import { range, Observable, Scheduler, asyncScheduler } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BasicService {

  constructor(private loggerService: LoggerService) { }

  plus(a, b) {
    const res = a + b;
    this.loggerService.log(res);
    return res;
  }

  getRange() {
    return range(0, 4).pipe(
      delay(1000)
    );
  }

}
