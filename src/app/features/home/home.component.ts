import { Component, OnInit } from '@angular/core';
import { DappazonService } from "../../services/dappazon.service";
import {SectionComponent} from "../../components/section/section.component";
// import {groupBy} from "rxjs";

interface Product {
  id: number;
  name: string;
  category: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    SectionComponent
  ]
})
export class HomeComponent implements OnInit {
  public images: Product[] = []
  public productsByCategory : { category: string; products: Product[] }[] = [];

  constructor(
    private dappazonService: DappazonService,
  ) { }

  public async ngOnInit(): Promise<void> {
    await this.dappazonService.getAllProducts().then(
      (images) => {
        this.images = images
      }
    )

    this.productsByCategory = this.groupProductsByCategory();
    console.log(this.productsByCategory)
  }

  private groupProductsByCategory(): { category: string, products: Product[] }[] {
    const groupedProductsMap = new Map<string, Product[]>();
    this.images.forEach(product => {
      const categoryProducts = groupedProductsMap.get(product.category) || [];
      categoryProducts.push(product);
      groupedProductsMap.set(product.category, categoryProducts);
    });

    return Array.from(groupedProductsMap.entries()).map(([category, products]) => ({
      category,
      products
    }));
  }
}
