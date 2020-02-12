import { LoggerService } from './logger.service';
import { Injectable } from '@angular/core';

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
}
