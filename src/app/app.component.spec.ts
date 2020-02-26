import { MatTabsModule } from '@angular/material/tabs';
import { fashionDB } from './fashion.mock';
import { sportsDB } from './sports.mock';
import { FeedService } from './feed.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { of } from 'rxjs';
import { Item } from './item.interface';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {

  let feedService: FeedService;
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async(() => {

    const feedServiceMock = {
      getSports: () => of(sportsDB),
      getFashion: () => of(fashionDB)
    } as any;

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatTabsModule,
        NoopAnimationsModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {
          provide: FeedService,
          useValue: feedServiceMock
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    feedService = TestBed.inject(FeedService);
  }
  ));

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should show fashion & sports items', () => {
    fixture.detectChanges();

    feedService.getFashion().subscribe(res => {

      fixture.detectChanges();

      const items = fixture.debugElement.queryAll(By.css('.item'));
      const firstItem = items[0];
      const titleOfFirstItem = firstItem.query(By.css('.description'));
      expect(titleOfFirstItem.nativeElement.innerText)
        .toEqual(fashionDB[0].description);

      expect(items.length).toEqual(fashionDB.length);

      const tabs = fixture.debugElement.queryAll(By.css('.mat-tab-label'));

      expect(tabs.length).toEqual(2);
    });
  });


});
