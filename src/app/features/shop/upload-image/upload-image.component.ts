import { Component } from '@angular/core'
import { IpfsService } from "../../../data/services/ipfs.service"
import {ReactiveFormsModule, UntypedFormBuilder, Validators} from "@angular/forms"
import { Router } from "@angular/router"
import { ShopContractService } from "../../../data/services/shop-contract.service";
import {AsyncPipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";
import {ShopStoreService} from "../../store/shop-store.service";
import {MatOption, MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton,
    HttpClientModule,
    MatLabel,
    MatSelect,
    MatOption,
    NgForOf,
    AsyncPipe,
    JsonPipe,
  ]
})
export class UploadImageComponent {
  public uploadForm = this.fb.group({
    name: this.fb.control('', Validators.required),
    price: this.fb.control('', Validators.required),
    quantity: this.fb.control('', Validators.required),
    category: this.fb.control('', Validators.required),
    image: this.fb.control('', Validators.required),
  })
  public uploadedImage = ''
  public formError = ''
  public isLoading = false
  categories$ = this.shopContractService.selectSelectedShopCategories$();

  constructor(
    private ipfs: IpfsService,
    private fb: UntypedFormBuilder,
    private router: Router,
    private gallery: ShopContractService,
    private shopContractService: ShopStoreService
  ) { }

  public async uploadImage(eventTarget: any) {
    const fileUrl = await this.ipfs.uploadFile(eventTarget.files[0])
    this.uploadedImage = fileUrl
    this.uploadForm.get('fileUrl')?.setValue(fileUrl)
  }

  public async onSubmit() {
    if (this.uploadForm.valid) {
      this.isLoading = true
      const title = this.uploadForm.get('title')?.value
      const fileUrl = this.uploadForm.get('fileUrl')?.value
      const description = this.uploadForm.get('description')?.value
      const metaDataUrl = await this.ipfs.uploadFile(JSON.stringify({
        fileUrl,
        description
      }))

      const isItemCreated = await this.gallery.addImage(title, metaDataUrl)

      this.isLoading = false
      if (isItemCreated) {
        await this.router.navigate([ '/authors-images' ]);
      }
    } else {
      console.error('form is not valid')
      this.formError = 'Form is not valid'
    }
  }
}
