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
import {environment} from "../../../environments/environment";

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
  isMyProduct = false;

  constructor(
    public dialogRef: MatDialogRef<ProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private shopStoreService: ShopStoreService
  ) {
    this.item = data;
    this.shopStoreService.selectAccount$().subscribe(account => {
      this.isMyProduct = account === this.item.seller;
    });
  }

  async ngOnInit(): Promise<void> {

  }


   buyHandler() {
      this.shopStoreService.orderProduct(this.item, 1);
      this.dialogRef.close();
  }


  onNoClick() {
    this.dialogRef.close();
  }

  formatUnits(amount: any) {
    return formatUnits(amount,'ether');
  }

  protected readonly Date = Date;

  getImage(image: any) {
    if (image?.toString().startsWith('http')) {
      return image;
    }
    return environment.ipfs + image;
  }
}
