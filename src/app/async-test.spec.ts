import { delay } from 'rxjs/operators';
import { of } from "rxjs";
import { fakeAsync, tick, flush } from '@angular/core/testing';

describe('AsyncTest', () => {
    it('async test - regualr', () => {
        let flag = false;

        expect(flag).toBeFalse();
        flag = true;
        expect(flag).toBeTrue();
    });

    it('async test - set timeout', (done: DoneFn) => {
        let flag = false;
        setTimeout(() => {
            flag = true;
            expect(flag).toBeTrue();
            done();
        }, 0);


    });

    it('async test - obervables', (done: DoneFn) => {
        let flag = false;
        expect(flag).toBeFalsy();

        of(1).pipe(
            delay(1000)
        ).subscribe(() => {
            flag = true;
            expect(flag).toBeTruthy();
            done();
        });


    });


    it('async test - fakeasync - tick', fakeAsync(() => {
        let flag = false;
        expect(flag).toBeFalsy();

        setTimeout(() => {
            flag = true;
        }, 1000);

        tick(500);

        expect(flag).toBeFalse();

        tick(501);

        expect(flag).toBeTruthy();

    }));


    it('async test - fakeasync - flush', fakeAsync(() => {
        let flag = false;
        expect(flag).toBeFalsy();

        setTimeout(() => {
            flag = true;
        }, 1000);

        flush();

        expect(flag).toBeTruthy();

    }));
});
