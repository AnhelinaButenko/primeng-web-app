import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {IProduct} from "./products-list";
import {ProductsService} from "./products.service";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements  OnInit, OnDestroy{
  errorMessage = '';
  sub!: Subscription;
  deleteSub!: Subscription;
  updateSub!: Subscription;
  show = false;
  private _listFilter = '';
  products!: any[];

  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.performFilter(value);
  }

  filteredProducts: IProduct[] = [];
  productsList: IProduct[] = [];

  constructor(private productsService: ProductsService,
              private route: ActivatedRoute,
              private router: Router) {}

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.productsList.filter((product: IProduct) =>
      product.name.toLocaleLowerCase().includes(filterBy));
  }

  ngOnInit(): void {
    this.sub = this.productsService.getProducts().subscribe({
      next: products => {
        this.productsList = products;
        this.filteredProducts = this.productsList;
      },
      error: err => this.errorMessage = err
    });
  }

  onDelete(id: number): void {
    this.deleteSub = this.productsService.deleteProduct(id).subscribe({
      next: (product: IProduct) => {
        this.show = true;
        setTimeout(() => {
          this.updateSub = this.productsService.getProducts().subscribe({
            next: products => {
              this.show = false;
              this.productsList = products;
              this.filteredProducts = this.productsList;
            }
          });
        }, 2000);
        //location.reload();
      },
      error: err => this.errorMessage = err
    });
  }

  onCreate(): void {
    this.router.navigate(['products/product-create']);
  }

  onUpdate(id: number): void {
    this.router.navigate([`products/product-update/${id}`]);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
