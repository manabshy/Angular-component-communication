import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { IProduct } from '../product';
import { timer } from 'rxjs/observable/timer';
@Component({
    selector: 'pm-product-shell-detail',
    templateUrl: './product-shell-detail.component.html'
})
export class ProductShellDetailComponent implements OnInit {
    pageTitle: string = 'Product Detail';

    // Angular change detection kicks in and return the product when the currentProduct property changes
    get prod(): IProduct | null {
        return this.productService.currentProduct;

    }
    constructor(private productService: ProductService) { }

    ngOnInit() {
        timer(0, 1000).subscribe(t => (console.log(this.prod)));
    }

}
