import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
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
  empForm: FormGroup;


  constructor(
    private _fb: FormBuilder,
    private _empService: ShopStoreService,
    private _dialogRef: MatDialogRef<CategoryEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) {
    this.empForm = this._fb.group({
      name: '',
      description: '',
    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this._empService
          .updateCategory(this.data.id, this.empForm.value)
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
        this._empService.addCategory(this.empForm.value)
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

}
