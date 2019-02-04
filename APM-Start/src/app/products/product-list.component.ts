import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { NgModel } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    pageTitle: string = 'Product List';
    showImage: boolean;

    imageWidth: number = 50;
    imageMargin: number = 2;
    errorMessage: string;

    filteredProducts: IProduct[];
    products: IProduct[];
    listFilter: string;
    @ViewChild('filterElement') filterElementRef: ElementRef;
    private _sub: Subscription;
    private _filterInput: NgModel;

    get filterInput(): NgModel {
        return this._filterInput;
    }
    @ViewChild(NgModel)
    set filterInput(value: NgModel) {
        this._filterInput = value;
        console.log(this.filterInput);
        if (this.filterInput && !this._sub) {
            console.log('subscribing');
            this._sub = this.filterInput.valueChanges.subscribe(

                () => {
                    this.performFilter(this.listFilter);
                    console.log('performed the filter');

                }

            );
        }
        if (this.filterElementRef) {
        this.filterElementRef.nativeElement.focus();
        }

    }
    constructor(private productService: ProductService) {
    }

    ngOnInit(): void {

        this.productService.getProducts().subscribe(
            (products: IProduct[]) => {
                this.products = products;
                this.performFilter(this.listFilter);
            },
            (error: any) => this.errorMessage = <any>error
        );
    }


    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    performFilter(filterBy?: string): void {
        if (filterBy) {
            this.filteredProducts = this.products.filter((product: IProduct) =>
                product.productName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
        } else {
            this.filteredProducts = this.products;
        }
    }
}
