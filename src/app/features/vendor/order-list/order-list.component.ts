import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatNoDataRow,
  MatRow, MatRowDef, MatTable, MatTableDataSource, MatTableModule
} from "@angular/material/table";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSort, MatSortHeader, MatSortModule} from "@angular/material/sort";
import {MatToolbar} from "@angular/material/toolbar";
import {CurrencyPipe, DatePipe, NgIf} from "@angular/common";
import {Category} from "../../../data/models/category";
import {MatDialog} from "@angular/material/dialog";
import {ShopStoreService} from "../../shop/store/shop-store.service";
import {SnackBarService} from "../../../shared/services/snack-bar.service";
import {ProductEditComponent} from "../../shop/products/product-edit/product-edit.component";
import {Order} from "../../../data/models/order";
import {environment} from "../../../../environments/environment";
import {formatUnits} from "ethers/lib/utils";

@Component({
  selector: 'app-order-list',
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
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss'
})
export class OrderListComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'qte',
    'price',
    'totalPrice',
    'image',
    'action',
  ];
  dataSource: MatTableDataSource<Order>  = new MatTableDataSource<Order>();
  Categories: Category[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator ;
  @ViewChild(MatSort) sort!: MatSort ;

  constructor(
    private _dialog: MatDialog,
    private _shopStoreService: ShopStoreService,
    private _coreService: SnackBarService
  ) {
    this._shopStoreService.selectSelectedShopCategories$().subscribe({
      next: (res) => {
        if (res && res.length > 0) {
          this.Categories = res;
        }
      },
      error: console.log,
    });

    this._shopStoreService.selectUserOrders$().subscribe({
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

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id: number) {
    this._shopStoreService.deleteProduct(id)
    this._coreService.openSnackBar('Employee deleted!', 'done');
  }

  getImage(image: any) {
    if (image?.toString().startsWith('http')) {
      return image;
    }
    return environment.ipfs + image;
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

  protected readonly formatUnits = formatUnits;
}

