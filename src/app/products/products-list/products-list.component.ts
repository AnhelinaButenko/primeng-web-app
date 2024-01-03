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
  private _listFilter = '';
  products!: any[];
  isLoading = false;

  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.performFilter();
  }

  filteredProducts: IProduct[] = [];
  productsList: IProduct[] = [];

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

  private filterBySearchString(products: IProduct[], searchStr: string): IProduct[] {
    if (!searchStr) return products;
    return products.filter(p => p.name.toLowerCase().includes(searchStr.toLowerCase()));
  }

  private filterByManufacturer(products: IProduct[], filterType: string): IProduct[] {
    switch (filterType) {
      case 'withManufacturer':
        return products.filter(p => p.manufacturerName);
      case 'withoutManufacturer':
        return products.filter(p => !p.manufacturerName);
      default:
        return products;
    }
  }

  performFilter(): void {
    let filteredProducts = this.productsList;

    filteredProducts = this.filterBySearchString(filteredProducts, this.listFilter);
    filteredProducts = this.filterByManufacturer(filteredProducts, this.selectedFilterOption);

    this.filteredProducts = filteredProducts;

    // filterBy = filterBy.toLocaleLowerCase();
    // if (this.selectedFilterOption === 'withManufacturer') {
    //   return this.productsList.filter((product: IProduct) =>
    //     product.manufacturerName && product.manufacturerName.toLocaleLowerCase().includes(filterBy)
    //   );
    // } else if (this.selectedFilterOption === 'withoutManufacturer') {
    //   return this.productsList.filter((product: IProduct) =>
    //     !product.manufacturerName || (product.manufacturerName && !product.manufacturerName.toLocaleLowerCase().includes(filterBy))
    //   );
    // }
    // return this.productsList.filter((product: IProduct) =>
    //   product.name.toLocaleLowerCase().includes(filterBy)
    // );
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.sub = this.productsService.getProducts().subscribe({
      next: products => {
        this.productsList = products;
        this.performFilter();
        this.isLoading = false;
      },
      error: err => this.errorMessage = err
    });
  }

  onFilterChange(event: any): void {
    this.selectedFilterOption = event.value.value;
    this.performFilter();
    // this.sub = this.productsService.getProducts(this.selectedFilterOption).subscribe({
    //   next: products => {
    //     this.productsList = products;
    //     this.onApplyFilter();
    //   },
    //   error: err => this.errorMessage = err
    // });
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
