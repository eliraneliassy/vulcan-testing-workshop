import { FeedService } from './feed.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from './item.interface';

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
  }
}
