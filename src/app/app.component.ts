import {AfterViewInit, Component, inject, ViewChild} from '@angular/core';
import {ShopContractService} from "./data/services/shop-contract.service";
import {Router} from "@angular/router";
import {ShopStoreService} from "./features/shop/store/shop-store.service";
import {MatMenuTrigger} from "@angular/material/menu";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent  implements AfterViewInit{
  title = 'angular-dapp';
  account: any;
  shop$ = this.shopStoreService.selectSelectedShop$();
  isLoading$ = this.shopStoreService.selectIsLoading$();
  vendorShop$ = this.shopStoreService.selectVendorShop$();

   constructor(
    private shopContractService: ShopContractService,
    private shopStoreService:ShopStoreService,
    private router: Router
  ) {
     this.shopContractService.getAccount().then(
      (account: any) => {
        this.loadData(account)
      },
      () => {
        this.account = null;
      }
     );

     (window as any).ethereum.on('accountsChanged',(accounts: any) =>{
       let account = accounts[0]
       this.loadData(account)
       this.router.navigate(['/'])
     })

  }

  async ngAfterViewInit(): Promise<void> {
    // await this.shopContractService.listenToEvents();
  }

  async connectHandler() {
     try {
       alert("Veuillez vous connecter à MetaMask pour continuer")

       await this.shopContractService.connect();

     } catch (error) {
        console.error('error', error)
     }
  }

  loadData(account: any) {
    this.shopStoreService.loadLogin(account)
    this.account = account;
    this.shopStoreService.loadShop(account)
    this.shopStoreService.loadShopCategories(account)
    this.shopStoreService.loadShopProducts(account)

    this.shopStoreService.loadShopOrders(account)
    this.shopStoreService.loadUserOrders(account)

  }

}
