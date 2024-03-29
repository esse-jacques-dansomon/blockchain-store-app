import {Component} from '@angular/core';
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router";




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    FormsModule,
    MatButton
  ]
})
export class HomeComponent  {
  search: any;
  constructor(
    private pouter: Router,
  ) { }

  searchRestaurant() {
    this.pouter.navigate(['/vendor', this.search]);
  }
}
