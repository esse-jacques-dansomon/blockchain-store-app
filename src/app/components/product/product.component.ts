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
import {Product} from "../../data/models/product";
import {ShopStoreService} from "../../features/shop/store/shop-store.service";
import { formatUnits } from 'ethers/lib/utils';

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
export class ProductComponent implements OnInit {
  item: Product;

  constructor(
    public dialogRef: MatDialogRef<ProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private shopStoreService: ShopStoreService
  ) {
    this.item = data.item;
  }

  async ngOnInit(): Promise<void> {

  }


   buyHandler() {
      this.shopStoreService.orderProduct(this.item, 1);
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
    return formatUnits(amount,'ether');
  }

  protected readonly Date = Date;
}
