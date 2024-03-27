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
import {ShopStoreService} from "../../../store/shop-store.service";
import {MatInput} from "@angular/material/input";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatButton} from "@angular/material/button";
import {NgForOf, NgIf} from "@angular/common";
import {IpfsService} from "../../../../data/services/ipfs.service";

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
    NgIf
  ],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss'
})
export class ProductEditComponent {
  empForm: FormGroup;

  education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ];
  uploadedImage: string = '';

  constructor(
    private _fb: FormBuilder,
    private _empService: ShopStoreService,
    private _dialogRef: MatDialogRef<ProductEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
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
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this._empService
          .updateProduct(this.data.id, this.empForm.value)
          // .subscribe({
          //   next: (val: any) => {
          //     this._coreService.openSnackBar('Employee detail updated!');
          //     this._dialogRef.close(true);
          //   },
          //   error: (err: any) => {
          //     console.error(err);
          //   },
          // });
      } else {
        this._empService.addProduct(this.empForm.value)
        //   .subscribe({
        //   next: (val: any) => {
        //     this._coreService.openSnackBar('Employee added successfully');
        //     this._dialogRef.close(true);
        //   },
        //   error: (err: any) => {
        //     console.error(err);
        //   },
        // });
      }
    }
  }

  public async uploadImage(eventTarget: any) {
    const fileUrl = await this.ipfs.uploadFile(eventTarget.files[0])
    this.uploadedImage = fileUrl
    this.empForm.get('image')?.setValue(fileUrl)
  }
}
