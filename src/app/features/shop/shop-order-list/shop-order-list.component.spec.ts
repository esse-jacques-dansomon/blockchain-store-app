import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopOrderListComponent } from './shop-order-list.component';

describe('ShopOrderListComponent', () => {
  let component: ShopOrderListComponent;
  let fixture: ComponentFixture<ShopOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopOrderListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShopOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
