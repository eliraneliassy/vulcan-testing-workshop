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

describe('AppComponent', () => {

  let feedService: FeedService;
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async(() => {

    feedService = {
      getSports: () => of(sportsDB),
      getFashion: () => of(fashionDB)
    } as any;

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {
          provide: FeedService,
          useValue: feedService
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  }
  ));

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should show fashion & sports items', () => {
    fixture.detectChanges();

    feedService.getFashion().subscribe((res: Item[]) => {
      const items = fixture.debugElement.queryAll(By.css('.item'));
      
    });
  });


});
