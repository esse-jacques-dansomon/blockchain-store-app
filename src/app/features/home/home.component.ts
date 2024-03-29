import {Component, OnInit} from '@angular/core';
import {SectionComponent} from "../../components/section/section.component";
import {AsyncPipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {ProductComponent} from "../../components/product/product.component";
import {combineLatest, map} from "rxjs";
import {ShopStoreService} from "../shop/store/shop-store.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    SectionComponent,
    AsyncPipe,
    NgIf,
    ProductComponent,
    NgForOf,
    JsonPipe
  ]
})
export class HomeComponent  {
  public productsByCategory$ = this.groupProductsByCategory();
  constructor(
    private shopStoreService: ShopStoreService,
  ) { }


  private groupProductsByCategory() {
   return   combineLatest(
      this.shopStoreService.selectSelectedShopCategories$(),
      this.shopStoreService.selectSelectedShopProducts$()
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
