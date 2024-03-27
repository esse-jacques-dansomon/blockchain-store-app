import { Component } from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatInput} from "@angular/material/input";
import {ShopStoreService} from "../../../store/shop-store.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    MatLabel,
    MatFormField,
    MatSelect,
    MatOption,
    MatInput,
    MatButton,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  public isLoading = false
  public formError: string=  '';
  constructor(
    private shopStoreService: ShopStoreService,
  ) {
  }
  form : FormGroup = new FormGroup({});

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  public async onSubmit() {
    if (this.form.valid) {
      this.isLoading = true

    } else {
      console.error('form is not valid')
      this.formError = 'Form is not valid'
    }
  }
}
