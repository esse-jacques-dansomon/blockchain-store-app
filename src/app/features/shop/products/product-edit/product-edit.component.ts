import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {SnackBarService} from "../../../../shared/services/snack-bar.service";
import {ShopStoreService} from "../../store/shop-store.service";
import {MatInput} from "@angular/material/input";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatButton} from "@angular/material/button";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {IpfsService} from "../../../../data/services/ipfs.service";
import {Product} from "../../../../data/models/product";

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [
    MatDialogTitle,
    ReactiveFormsModule,
    MatFormField,
    MatDialogContent,
    MatInput,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatRadioGroup,
    MatLabel,
    MatRadioButton,
    MatSelect,
    MatOption,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatHint,
    NgForOf,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss'
})
export class ProductEditComponent {
  empForm: FormGroup;
  uploadedImage: string = '';

  categories$ = this._shopStoreService.selectSelectedShopCategories$()  ;
  constructor(
    private _fb: FormBuilder,
    private _shopStoreService: ShopStoreService,
    private _dialogRef: MatDialogRef<ProductEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private _coreService: SnackBarService,
    private ipfs : IpfsService,
  ) {
    this.empForm = this._fb.group({
      name: '',
      price: '',
      availableQuantity: '',
      available: '',
      categoryId: '',
      image:''
    });

    this._shopStoreService.selectShopLoading$().subscribe({
      next: (val: any) => {
        if (!val) return
        this._dialogRef.close(true);
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.empForm.patchValue(this.data);
      this.empForm.get('available')?.setValue(this.data.available ? 'true' : 'false');
      this.empForm.get('categoryId')?.setValue(this.data.categoryId.toString());
    }

  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this._shopStoreService
          .updateProduct(this.data.id, this.empForm.value)
      } else {
        this._shopStoreService.addProduct(this.empForm.value)
      }
    }
  }

  public async uploadImage(eventTarget: any) {
    const fileUrl = await this.ipfs.uploadFile(eventTarget.files[0])
    this.uploadedImage = fileUrl
    this.empForm.get('image')?.setValue(fileUrl)
  }
}
