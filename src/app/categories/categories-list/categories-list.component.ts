import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {IProduct} from "../../products/products-list/products-list";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {ProductsService} from "../../products/products-list/products.service";
import {ICategory} from "./categories-list";
import {CategoriesListService} from "./categories-list.service";

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent  implements  OnInit, OnDestroy {
  errorMessage = '';
  sub!: Subscription;
  deleteSub!: Subscription;
  updateSub!: Subscription;
  show = false;
  isLoading = false;
  private _listFilter = '';
  selectedFilterOption: string = 'all';
  categories!: any[];
  filteredCategories: { productsId: number[] | undefined; name: string; id: number; products: unknown }[] = [];
  categoriesList: ICategory[] = [];
  products: IProduct[] = [];

  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
  }

  filterOptions = [
    { label: 'All category', value: 'all' },
    { label: 'Category with products', value: 'withProducts' },
    { label: 'Category without products', value: 'withoutProducts' },
  ];

  constructor(private categoriesService: CategoriesListService,
              private route: ActivatedRoute,
              private router: Router,
              private messageService: MessageService,
              private productService: ProductsService) {}

  applyFilters(): void {
    this.isLoading = true;
    this.sub = this.categoriesService.getCategories(this.listFilter, this.selectedFilterOption).subscribe({
      next: categories => {
        this.filteredCategories = categories;
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

    this.sub = this.categoriesService.getCategories().subscribe({
      next: categories => {
        this.filteredCategories = categories;
        this.isLoading = false;
      },
      error: err => this.errorMessage = err
    });
  }

  onFilterChange(event: any): void {
    this.selectedFilterOption = event.value.value;
  }

  onDelete(id: number): void {
    this.deleteSub = this.categoriesService.deleteCategory(id).subscribe({
      next: (category: ICategory) => {
        this.show = true;
        setTimeout(() => {
          this.updateSub = this.categoriesService.getCategories().subscribe({
            next: categories => {
              this.show = false;
              this.categoriesList = categories;
              this.filteredCategories = this.categoriesList;
            }
          });
        }, 2000);
        this.messageService.add({severity:'success', summary:'Service Message', detail:'This category is removed'});
      },
      error: err => this.errorMessage = err
    });
  }

  onCreate(): void {
    this.router.navigate(['categories/categories-create']);
  }

  onUpdate(id: number): void {
    this.router.navigate([`categories/categories-update/${id}`]);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
