import {Component, Input} from '@angular/core';
import {RatingComponent} from "../rating/rating.component";
import {NgForOf} from "@angular/common";
import {ProductComponent} from "../product/product.component";
import {MatDialog} from "@angular/material/dialog";
import {formatUnits} from "ethers/lib/utils";

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [
    RatingComponent,
    NgForOf
  ],
  template: `
    <div class="cards__section">
      <h3 [id]="title">{{ title }}</h3>
      <hr />
      <div class="cards">
        <div *ngFor="let item of items; let index = index" class="card" (click)="togglePop(item)">
          <div class="card__image">
            <img [src]="item.image" alt="Item" />
          </div>
          <div class="card__info">
            <h4>{{ item.name }}</h4>
            <app-rating [value]="item.rating"></app-rating>
            <p>{{ formatUnits(item.cost) }} ETH</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class SectionComponent {
  @Input() title!: string;
  @Input() items!: any[];

  constructor(
    public dialog: MatDialog
  ) {
  }



  togglePop(item: any) {
    const dialogRef = this.dialog.open(ProductComponent, {
      data: {
        item: item,
        user:item
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  protected readonly formatUnits = formatUnits;
}
