import {Component, Input} from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [
    NgForOf
  ],
  template:
    `
      <div class="rating">
        <img *ngFor="let star of stars" [src]="'assets/' + star + '.svg'" width="20px" height="20px" alt="Star" />
      </div>
  `,
})
export class RatingComponent {
  @Input() value!: number;
  stars: string[] = [];

  ngOnInit() {
    for (let i = 1; i <= 5; i++) {
      this.stars.push(this.value >= i ? 'star-solid' : 'star-regular');
    }
  }
}
