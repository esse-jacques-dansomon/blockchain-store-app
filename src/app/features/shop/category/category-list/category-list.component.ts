import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatNoDataRow,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from "@angular/material/table";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {MatToolbar} from "@angular/material/toolbar";
import {MatDialog} from "@angular/material/dialog";
import {ShopStoreService} from "../../store/shop-store.service";
import {SnackBarService} from "../../../../shared/services/snack-bar.service";
import {CategoryEditComponent} from "../category-edit/category-edit.component";

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    MatButton,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatFormField,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatSort,
    MatSortHeader,
    MatTable,
    MatToolbar,
    MatHeaderCellDef,
    MatNoDataRow
  ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent implements AfterViewInit{
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'action',
  ];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  private user: any;

  constructor(
    private _dialog: MatDialog,
    private _shopStoreService: ShopStoreService,
    private _coreService: SnackBarService
  ) {
    this._shopStoreService.selectSelectedShopCategories$().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res || []);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
    });

    this._shopStoreService.selectAccount$().subscribe({
      next: (res) => {
        this.user = res;
      },
    });
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(CategoryEditComponent);
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
    this._shopStoreService.deleteCategory(id)
    this._coreService.openSnackBar('Category deleted!', 'done');
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(CategoryEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this._shopStoreService.loadShopCategories(this.user)
        }
      },
    });
  }
}
