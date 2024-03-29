import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorShopComponent } from './vendor-shop.component';

describe('VendorShopComponent', () => {
  let component: VendorShopComponent;
  let fixture: ComponentFixture<VendorShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorShopComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VendorShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
