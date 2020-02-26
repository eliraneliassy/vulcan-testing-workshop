import { delay } from 'rxjs/operators';
import { FeedService } from './feed.service';
import { Component, OnInit } from '@angular/core';
import { Observable, of, asyncScheduler, asapScheduler } from 'rxjs';
import { Item } from './item.interface';
import { promise } from 'protractor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // feed$: Observable<Item[]>;
  fashion$: Observable<Item[]>;
  sports$: Observable<Item[]>;

  constructor(private feedService: FeedService) { }

  ngOnInit(): void {
    this.fashion$ = this.feedService.getFashion();
    this.sports$ = this.feedService.getSports();

    console.log(1);
    setTimeout(() => console.log(2), 0);
    of(4).pipe(

    ).subscribe(console.log);
    Promise.resolve(3).then(console.log);

    console.log(5);

  }



}
