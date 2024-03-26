import { Component } from '@angular/core';
import {ShopContractService} from "./services/shop-contract.service";
import {NgIf} from "@angular/common";
import {RouterOutlet} from "@angular/router";
import {ShopStoreService} from "./features/store/shop-store.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // standalone: true,
  // imports: [
  //   NgIf,
  //   RouterOutlet
  // ],

})
export class AppComponent {
  title = 'angular-dapp';
  account: any;

   constructor(
    private shopContractService: ShopContractService,
    private shopStoreService:ShopStoreService
  ) {
     this.shopContractService.getAccount().then(
      (account: any) => {
        this.account = account;
        this.shopStoreService.loadShop(account)
        this.shopStoreService.loadShopCategories(account)
        this.shopStoreService.loadShopProducts(account)
      }
     );



  }

  async connectHandler() {
    await this.shopContractService.connect().then(
      (account: any) => {
        this.account = account;
      }
    );
  }
}
