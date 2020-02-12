import { ITEMS_MOCK } from './../items.mock';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemComponent } from './item.component';
import { By } from '@angular/platform-browser';
import { CurrencyPipe } from '@angular/common';
import { Item } from '../item.interface';

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;
  let item;

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

    item = ITEMS_MOCK[0];
    component.item = item;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render item', () => {

    const title = fixture.debugElement.query(By.css('.title'));
    expect(title.nativeElement.innerText).toEqual(item.description);

    const image = fixture.debugElement.query(By.css('img'));
    expect(image.nativeElement.src).toEqual(item.imageUrl);

    const price = fixture.debugElement.query(By.css('.price'));
    const pipe = new CurrencyPipe('en');

    expect(price.nativeElement.innerText).toEqual(pipe.transform(item.price));


  });

  it('emit add to cart event - with spys', () => {
    spyOn(component.addToCart, 'emit');

    component.addToCartClicked();

    expect(component.addToCart.emit).toHaveBeenCalledTimes(1);
  });

  it('emit add to cart - observables', () => {
    component.addToCart.subscribe((res: Item) => {
      expect(res._id).toEqual(item._id);
    });

    component.addToCartClicked();

  });
});
