import { Component } from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {ShopStoreService} from "../store/shop-store.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {Shop} from "../../../data/models/shop";

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
    NgIf
  ],
  templateUrl: './shop-form.component.html',
  styleUrl: './shop-form.component.scss'
})
export class ShopFormComponent {
  public isLoading = false
  public formError: string=  '';
  shop: Shop | undefined;
  constructor(
    private shopStoreService: ShopStoreService,
  ) {
  }
  shopForm : FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
  });

  ngOnInit() {
    this.shopStoreService.selectSelectedShop$().subscribe(shop => {
      if (shop) {
        console.log('shop', shop)
        this.shop = shop;
        this.shopForm.patchValue(shop);
      }
    })
  }

  public async onSubmit() {
    if (this.shopForm.valid) {
      this.isLoading = true

    } else {
      console.error('form is not valid')
      this.formError = 'Form is not valid'
    }
  }


}
