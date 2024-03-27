import { Component, OnInit } from '@angular/core';
import { ShopContractService } from "../../../data/services/shop-contract.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MatCard, MatCardContent, MatCardHeader, MatCardImage, MatCardTitle} from "@angular/material/card";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-images-by-author',
  templateUrl: './images-by-author.component.html',
  styleUrls: ['./images-by-author.component.scss'],
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardImage,
    MatCardContent,
    MatCardTitle,
    NgForOf,
    HttpClientModule
  ]
})
export class ImagesByAuthorComponent implements OnInit {
  public images: any[] = []

  constructor(
    private gallery: ShopContractService,
    private http: HttpClient
  ) { }

  public async ngOnInit(): Promise<void> {
    // const images = await this.gallery.getImagesByAuthor()
    // this.images = await Promise.all(images.map(async (image) => {
    //   const metaData: any = await this.http.get(image.imageMetaDataUrl).toPromise()
    //   return {
    //     title: image.title,
    //     image: metaData.fileUrl,
    //     description: metaData.description
    //   }
    // }))
  }
}
