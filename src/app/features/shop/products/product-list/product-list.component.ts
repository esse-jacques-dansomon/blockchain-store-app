import {Component, ViewChild} from '@angular/core';
import {ProductEditComponent} from "../product-edit/product-edit.component";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatNoDataRow, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource, MatTableModule
} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {MatSort, MatSortHeader, MatSortModule} from "@angular/material/sort";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {ShopStoreService} from "../../store/shop-store.service";
import {SnackBarService} from "../../../../shared/services/snack-bar.service";
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {CurrencyPipe, DatePipe, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {Category} from "../../../../data/models/category";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    MatToolbar,
    MatButton,
    MatFormField,
    MatTable,
    MatInput,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatSort,
    DatePipe,
    CurrencyPipe,
    MatIconButton,
    MatIcon,
    MatHeaderRow,
    MatNoDataRow,
    MatHeaderRowDef,
    MatRowDef,
    MatRow,
    MatPaginator,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatLabel,
    MatSortHeader,
    NgIf
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  displayedColumns: string[] = [
    'id',
    'name',
    'price',
    'availableQuantity',
    'categoryId',
    'image',
    'available',
    'action',
  ];
  dataSource: MatTableDataSource<any>  = new MatTableDataSource<any>();
  Categories: Category[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(
    private _dialog: MatDialog,
    private _empService: ShopStoreService,
    private _coreService: SnackBarService
  ) {
    this._empService.selectSelectedShopCategories$().subscribe({
      next: (res) => {
        if (res && res.length > 0) {
          this.Categories = res;
        }
      },
      error: console.log,
    });

    this._empService.selectSelectedShopProducts$().subscribe({
      next: (res) => {
        if (res && res.length > 0) {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.sort = this.sort!;
          this.dataSource.paginator = this.paginator!;
        }
      },
      error: console.log,
    });
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(ProductEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {

        }
      },
    });
  }

  getCategoryName(id: any) {
    return this.Categories.find((cat) => cat.id.toString() == id)?.name;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id: number) {
    this._empService.deleteProduct(id)
    this._coreService.openSnackBar('Employee deleted!', 'done');
    //   .subscribe({
    //   next: (res) => {
    //     this._coreService.openSnackBar('Employee deleted!', 'done');
    //     this.getEmployeeList();
    //   },
    //   error: console.log,
    // });
  }

  openEditForm(data: any) {
    console.log(data)
    const dialogRef = this._dialog.open(ProductEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {

        }
      },
    });
  }
}
