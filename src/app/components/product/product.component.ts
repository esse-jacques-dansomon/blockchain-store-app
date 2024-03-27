import {Component, Inject, Input, OnInit} from '@angular/core';
import {RatingComponent} from "../rating/rating.component";
import {DatePipe, DecimalPipe, NgIf} from "@angular/common";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {ShopContractService} from "../../data/services/shop-contract.service";
import {Product} from "../../data/models/product";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    RatingComponent,
    DatePipe,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    NgIf,
    DecimalPipe
  ],
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit{
  constructor(
    public dialogRef: MatDialogRef<ProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dappazonService: ShopContractService
  ) {
    this.item = data.item;

  }

  async ngOnInit(): Promise<void> {
    // this.account = data.account;
    await this.dappazonService.getAccount().then((user) => {
      this.account = user
    })
    this.fetchOrder();
  }
   item: Product;
   account: any;

  order: any = null;
  deliveryDate: Date = new Date(Date.now() + 345600000); // 4 days from now


  async buyHandler() {
    console.log("Buying item", this.item);
    await this.dappazonService.buyHandler(this.item.id)

    this.fetchOrder()
  }

   fetchOrder() {
    // console.log('fetching order', this.account)
    // if (!this.account) return;
    // this.dappazonService.fetchOrder(this.item.id).then((order) => {
    //   this.order = order;
    //   console.log('order', order)
    // });
  }



  onNoClick() {
    this.dialogRef.close();
  }

  formatUnits(amount: any) {
    return this.dappazonService.formatUnits(amount)
  }
}
