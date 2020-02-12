import { ITEMS_MOCK } from './../items.mock';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemComponent } from './item.component';
import { By } from '@angular/platform-browser';
import { CurrencyPipe } from '@angular/common';

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render item', () => {
    const item = ITEMS_MOCK[0];
    component.item = item;

    fixture.detectChanges();


    const title = fixture.debugElement.query(By.css('.title'));
    expect(title.nativeElement.innerText).toEqual(item.description);

    const image = fixture.debugElement.query(By.css('img'));
    expect(image.nativeElement.src).toEqual(item.imageUrl);

    const price = fixture.debugElement.query(By.css('.price'));
    const pipe = new CurrencyPipe('en');

    expect(price.nativeElement.innerText).toEqual(pipe.transform(item.price));


  });
});
