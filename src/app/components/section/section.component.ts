import {Component, Input} from '@angular/core';
import {RatingComponent} from "../rating/rating.component";
import {NgForOf} from "@angular/common";

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
        <div *ngFor="let item of items; let index = index" class="card" >
          <div class="card__image">
            <img [src]="item.image" alt="Item" />
          </div>
          <div class="card__info">
            <h4>{{ item.name }}</h4>
            <app-rating [value]="item.rating"></app-rating>
            <p>{{ item.cost  }}</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class SectionComponent {
  @Input() title!: string;
  @Input() items!: any[];
}
