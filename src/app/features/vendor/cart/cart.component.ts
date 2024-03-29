import { Component } from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatList, MatListItem} from "@angular/material/list";
import {CurrencyPipe, JsonPipe, NgForOf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatLine} from "@angular/material/core";
import {ShopStoreService} from "../../shop/store/shop-store.service";
import {ShopContractService} from "../../../data/services/shop-contract.service";
import {formatUnits} from "ethers/lib/utils";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardHeader,
    MatCardContent,
    MatList,
    MatListItem,
    CurrencyPipe,
    MatCardActions,
    MatButton,
    MatLine,
    NgForOf,
    JsonPipe
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  account: any;
   constructor(
    private shopStoreService: ShopContractService
  ) {
     this.shopStoreService.getAccountInfo().then((account) => {
      this.account = account;
    })
  }
  cartItems: any[] = [
    { name: 'Product 1', price: 10.99, imageUrl: 'path/to/image1.jpg' },
    { name: 'Product 2', price: 15.99, imageUrl: 'path/to/image2.jpg' },
    // Add more items as needed
  ];

  checkout() {
    // Implement checkout logic here
    console.log('Checkout clicked');
  }

  protected readonly formatUnits = formatUnits;
}
