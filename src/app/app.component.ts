import { Component } from '@angular/core';
import {DappazonService} from "./services/dappazon.service";
import {NgIf} from "@angular/common";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    RouterOutlet
  ]
})
export class AppComponent {
  title = 'angular-dapp';
  account: any;

   constructor(
    private dappazonService: DappazonService
  ) {
     this.dappazonService.getAccount().then(
      (account: any) => {
        this.account = account;
      }
     );
  }

  connectHandler() {
    this.dappazonService.connect().then(
      (account: any) => {
        this.account = account;
      }
    );
  }
}
