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
  it('should return a + b', () => {
    const service = new BasicService();

    const result = service.plus(1, 3);

    expect(result).toEqual(4);
  });
});
