import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatSelect} from "@angular/material/select";
import {NgForOf, NgIf} from "@angular/common";
import {ShopStoreService} from "../../store/shop-store.service";
import {ShopContractService} from "../../../../data/services/shop-contract.service";

@Component({
  selector: 'app-category-edit',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatRadioButton,
    MatRadioGroup,
    MatSelect,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    MatDialogClose
  ],
  templateUrl: './category-edit.component.html',
  styleUrl: './category-edit.component.scss'
})
export class CategoryEditComponent {
  empForm: FormGroup =  this._fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]]
  });


  constructor(
    private _fb: FormBuilder,
    private _shopStoreService: ShopStoreService,
    private _dialogRef: MatDialogRef<CategoryEditComponent>,
    private _shopContractService: ShopContractService,
    @Inject(MAT_DIALOG_DATA) public data: any,


  ) {

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
    this.empForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data && this.data.id) {
        this._shopStoreService
          .updateCategory(this.data.id, this.empForm.value)
      } else {
        this._shopStoreService.addCategory(this.empForm.value)
      }


    }
  }

}
