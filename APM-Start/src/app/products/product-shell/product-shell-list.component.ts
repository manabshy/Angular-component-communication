import { Component, OnInit } from '@angular/core';

import { IProduct } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-shell-list',
  templateUrl: './product-shell-list.component.html'
})
export class ProductShellListComponent implements OnInit {
  pageTitle: string = 'Products';
  errorMessage: string;
  products: IProduct[];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (products: IProduct[]) => {
        this.products = products;
      },
      (error: any) => this.errorMessage = <any>error
    );
  }

  onSelected(product: IProduct) {
    this.productService.currentProduct = product;
    // Everytime this property changes - currentProduct - Which is a product.productName property defined in the product shell detail component template,angular change detection picks up that the value is changed and the getter in product shell detail component returns the modified current product from the service. All of this works because the property is bound and change detection provides the change notifications.

  }

}
