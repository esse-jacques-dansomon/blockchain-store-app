import { Component } from '@angular/core';
import {DappazonService} from "./services/dappazon.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
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
