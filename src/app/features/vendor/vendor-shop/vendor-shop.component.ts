import { Component } from '@angular/core';
import {AsyncPipe, NgIf} from "@angular/common";
import {SectionComponent} from "../../../components/section/section.component";
import {ShopStoreService} from "../../shop/store/shop-store.service";
import {combineLatest, map} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-vendor-shop',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    SectionComponent
  ],
  templateUrl: './vendor-shop.component.html',
  styleUrl: './vendor-shop.component.scss'
})
export class VendorShopComponent {
  public productsByCategory$ = this.groupProductsByCategory();
  public vendorShop$ = this.shopStoreService.selectVendorShop$();
  constructor(
    private shopStoreService: ShopStoreService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      console.log(params['id'])
      let shopOwner = params['id'];
      this.shopStoreService.loadVendorShop(shopOwner);
      this.shopStoreService.loadVendorCategories(shopOwner);
      this.shopStoreService.loadVendorProducts(shopOwner);
    });
  }


  private groupProductsByCategory() {
    return   combineLatest(
      this.shopStoreService.selectVendorCategories$(),
      this.shopStoreService.selectVendorProducts$()
    ).pipe(
      map(([categories, products]) => {
        // Group products by category
        if (!categories || !products) return [];
        return categories!.map(category => {
          let d =  {
            category: category.name,
            produits: products!.filter(product =>{
              return  product.categoryId.toString() == category.id.toString()
            })
          };
          return d;
        });
      })
    )
  }
}
