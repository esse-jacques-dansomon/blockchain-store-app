import { Component } from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {ShopStoreService} from "../store/shop-store.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {AsyncPipe, NgIf} from "@angular/common";
import {Shop} from "../../../data/models/shop";
import {QRCodeModule} from "angularx-qrcode";
import {SafeUrl} from "@angular/platform-browser";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-shop-from',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    MatButton,
    NgIf,
    AsyncPipe,
    QRCodeModule
  ],
  templateUrl: './shop-form.component.html',
  styleUrl: './shop-form.component.scss'
})
export class ShopFormComponent {
  public isLoading$ = this.shopStoreService.selectIsLoading$();
  public formError: string=  '';
  shop: Shop | undefined;
  public myAngularxQrCode: string = "";
  public qrCodeDownloadLink: SafeUrl = "";

  shopForm : FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
  });
  constructor(
    private shopStoreService: ShopStoreService,
  ) {
  }

  onChangeURL(url: SafeUrl) {
    console.log('url', url)
    this.qrCodeDownloadLink = url;
  }


  ngOnInit() {
    this.shopStoreService.selectSelectedShop$().subscribe(shop => {
      if (shop) {
        console.log('shop', shop)
        this.shop = shop;
        this.shopForm.patchValue(shop);

        this.myAngularxQrCode =environment.baseUrl + '/vendor/' + this.shop?.owner.toString();

      }
    })
  }

  public async onSubmit() {
    if (this.shopForm.valid) {
      if (this.shop) {
        this.shopStoreService.updateShop(this.shopForm.value)
      }else {
        this.shopStoreService.createShop(this.shopForm.value)
      }
    } else {
      console.error('form is not valid')
      this.formError = 'Form is not valid'
    }
  }


}
