import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {IProduct} from "./products-list";
import {ProductsService} from "./products.service";
import {MessageService} from "primeng/api";

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
  products!: any[];
  isLoading = false;
  productsList: IProduct[] = [];
  private _listFilter = '';

  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    // this.performFilter();
  }
  //
  // filteredProducts: IProduct[] = [];
  //
  filterOptions = [
    { label: 'All products', value: 'all' },
    { label: 'Products with Manufacturer', value: 'withManufacturer' },
    { label: 'Products without Manufacturer', value: 'withoutManufacturer' }
  ];

  selectedFilterOption: string = 'all';

  constructor(private productsService: ProductsService,
              private route: ActivatedRoute,
              private router: Router,
              private messageService: MessageService) {
  }

  applyFilters(): void {
    this.isLoading = true;

    this.sub = this.productsService.getProducts(this.listFilter, this.selectedFilterOption).subscribe({
      next: products => {
        this.productsList = products;
        this.isLoading = false;
      },
      error: err => this.errorMessage = err
    });
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.sub = this.productsService.getProducts().subscribe({
      next: products => {
        this.productsList = products;
        // this.performFilter();
        this.isLoading = false;
      },
      error: err => this.errorMessage = err
    });
  }

  onFilterChange(event: any): void {
    this.selectedFilterOption = event.value.value;
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
            }
          });
        }, 2000);
        this.messageService.add({severity:'success', summary:'Service Message', detail:'This product is removed'});
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
