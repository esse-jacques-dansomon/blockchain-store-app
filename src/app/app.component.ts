import { Component } from '@angular/core';
import {ShopContractService} from "./services/shop-contract.service";
import {ShopStoreService} from "./features/store/shop-store.service";
import {of} from "rxjs";

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
  shop$ = this.shopStoreService.selectSelectedShop$();

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

     (window as any).ethereum.on('accountsChanged',(accounts: any) =>{
       let account = accounts[0]
       console.log('account changed', account)
       this.account = account;
       this.shopStoreService.loadShop(account)
       this.shopStoreService.loadShopCategories(account)
       this.shopStoreService.loadShopProducts(account)
     })




  }

  async connectHandler() {
    await this.shopContractService.connect().then(
      (account: any) => {
        this.account = account;
      }
    );
  }
}
