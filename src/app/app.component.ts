import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {ShopContractService} from "./data/services/shop-contract.service";
import {Router} from "@angular/router";
import {ShopStoreService} from "./features/shop/store/shop-store.service";
import {SnackBarService} from "./shared/services/snack-bar.service";
import {Shop} from "./data/models/shop";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent  implements OnInit{
  title = 'angular-dapp';
  account: any;
  shop$ = this.shopStoreService.selectSelectedShop$();
  isLoading$ = this.shopStoreService.selectIsLoading$();
  error$ = this.shopStoreService.selectError$();
  vendorShop$ = this.shopStoreService.selectVendorShop$();
   constructor(
    private shopContractService: ShopContractService,
    private shopStoreService:ShopStoreService,
    private router: Router,
    private snackBar: SnackBarService
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
       this.router.navigate(['/home'])
     })

     this.error$.subscribe((error) => {
       if(error) {
         this.snackBar.openSnackBar(error.message, 'error')
       }
     });

  }

  async ngOnInit() {
    const contract = await this.shopContractService.getContractInstance();
    contract.on('OrderCreated', (storeOwner: any) => {
      this.shopStoreService.loadShopOrders(this.account)
      this.shopStoreService.loadUserOrders(this.account)
    })
    contract.on('StoreCreated', (storeOwner: Shop) => {
      if (storeOwner.owner === this.account) {
        this.loadShopData(this.account)
      }
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

  loadData(account: any) {
     if (!account) {
      this.account = null;
      return;
     }
    this.account = account;
    this.shopStoreService.loadLogin(account)
    this.shopStoreService.loadUserOrders(account)
    this.loadShopData(account)
  }

  loadShopData(account: any) {
    if (!account) {
      return;
    }
    this.shopStoreService.loadShop(account)
    this.shopStoreService.loadShopCategories(account)
    this.shopStoreService.loadShopProducts(account)
    this.shopStoreService.loadShopOrders(account)
  }

}
