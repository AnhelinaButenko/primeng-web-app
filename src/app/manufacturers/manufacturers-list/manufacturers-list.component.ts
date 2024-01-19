import {Component, OnDestroy, OnInit} from '@angular/core';
import {forkJoin, Observable, Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {ManufacturersListService} from "./manufacturers-list.service";
import {IManufacturer} from "./manufacturers-list";
import {IProduct} from "../../products/products-list/products-list";
import {ProductsService} from "../../products/products-list/products.service";

@Component({
  selector: 'app-manufacturers-list',
  templateUrl: './manufacturers-list.component.html',
  styleUrls: ['./manufacturers-list.component.scss']
})
export class ManufacturersListComponent  implements  OnInit, OnDestroy {
  errorMessage = '';
  sub!: Subscription;
  deleteSub!: Subscription;
  updateSub!: Subscription;
  show = false;
  isLoading = false;
  private _listFilter = '';
  selectedFilterOption: string = 'all';
  manufacturers!: any[];
  filteredManufacturers: { productsId: number[] | undefined; name: string; id: number; products: unknown }[] = [];
  manufacturersList: IManufacturer[] = [];
  products: IProduct[] = [];

  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
  }

  filterOptions = [
    { label: 'All manufacturers', value: 'all' },
    { label: 'Manufacturer with products', value: 'withProducts' },
    { label: 'Manufacturer without products', value: 'withoutProducts' },
  ];

  constructor(private manufacturersService: ManufacturersListService,
              private route: ActivatedRoute,
              private router: Router,
              private messageService: MessageService,
              private productService: ProductsService) {}

  applyFilters(): void {
    this.isLoading = true;
    this.sub = this.manufacturersService.getManufacturers(this.listFilter, this.selectedFilterOption).subscribe({
      next: manufacturers => {
        this.filteredManufacturers = manufacturers;
        this.isLoading = false;
      },
      error: err => this.errorMessage = err
    });
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.productService.getProducts().subscribe((products: IProduct[]) => {
      this.products = products;
    });

    this.sub = this.manufacturersService.getManufacturers().subscribe({
      next: manufacturers => {
        this.filteredManufacturers = manufacturers;
        this.isLoading = false;
      },
      error: err => this.errorMessage = err
    });
  }

  onFilterChange(event: any): void {
    this.selectedFilterOption = event.value.value;
  }

  onDelete(id: number): void {
    this.deleteSub = this.manufacturersService.deleteManufacturer(id).subscribe({
      next: (manufacturer: IManufacturer) => {
        this.show = true;
        setTimeout(() => {
          this.updateSub = this.manufacturersService.getManufacturers().subscribe({
            next: manufacturers => {
              this.show = false;
              this.manufacturersList = manufacturers;
              this.filteredManufacturers = this.manufacturersList;
            }
          });
        }, 2000);
        this.messageService.add({severity:'success', summary:'Service Message', detail:'This manufacturer is removed'});
      },
      error: err => this.errorMessage = err
    });
  }

  onCreate(): void {
    this.router.navigate(['manufacturers/manufacturer-create']);
  }

  onUpdate(id: number): void {
    this.router.navigate([`manufacturers/manufacturer-update/${id}`]);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
