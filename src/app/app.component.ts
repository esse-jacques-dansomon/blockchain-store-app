import {Component, inject} from '@angular/core';
import {ShopContractService} from "./data/services/shop-contract.service";
import {ShopStoreService} from "./features/store/shop-store.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent {
  title = 'angular-dapp';
  account: any;
  shop$ = this.shopStoreService.selectSelectedShop$();

   constructor(
    private shopContractService: ShopContractService,
    private shopStoreService:ShopStoreService,
    private router: Router
  ) {
     this.shopContractService.getAccount().then(
      (account: any) => {
        this.shopStoreService.loadLogin(account)
        this.account = account;
        this.shopStoreService.loadShop(account)
        this.shopStoreService.loadShopCategories(account)
        this.shopStoreService.loadShopProducts(account)
      },
      () => {
        this.account = null;
      }
     );

     (window as any).ethereum.on('accountsChanged',(accounts: any) =>{
       let account = accounts[0]
       this.shopStoreService.loadLogin(account)
       this.account = account;
       this.shopStoreService.loadShop(account)
       this.shopStoreService.loadShopCategories(account)
       this.shopStoreService.loadShopProducts(account)
       this.router.navigate(['/'])
     })




  }

  async connectHandler() {
     try {
       alert("Veuillez vous connecter à MetaMask pour continuer")

       await this.shopContractService.connect();

     } catch (error) {
        console.error('error', error)
     }
  }
}
