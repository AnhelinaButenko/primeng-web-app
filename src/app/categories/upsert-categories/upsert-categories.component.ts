import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {IProduct} from "../../products/products-list/products-list";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {ProductsService} from "../../products/products-list/products.service";
import {ICategory} from "../categories-list/categories-list";
import {CategoriesListService} from "../categories-list/categories-list.service";

@Component({
  selector: 'app-upsert-categories',
  templateUrl: './upsert-categories.component.html',
  styleUrls: ['./upsert-categories.component.scss']
})
export class UpsertCategoriesComponent implements OnInit, OnDestroy {

  sub: Subscription | undefined;
  getByIdSub: Subscription | undefined;
  updateSub: Subscription | undefined;
  deleteSub: Subscription | undefined;
  category: ICategory | undefined;
  sourceProducts: IProduct[] = [];
  targetProducts: IProduct[] = [];
  form: FormGroup| undefined = undefined;

  constructor(private categoriesService: CategoriesListService, private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private messageService: MessageService,
              private productService: ProductsService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(filter: string=''): void {
    this.productService.getProducts().subscribe((products: IProduct[]) => {
      this.sourceProducts = products;
      this.cdr.markForCheck();
    });

    const id = Number(this.route.snapshot.paramMap.get('id'));

    if(id) {
      this.getByIdSub = this.categoriesService.getById(id).subscribe({
        next: (category: ICategory) => {
          this.category = category;

          this.form = this.fb.group({
            id: [category.id],
            name: [category.name, [Validators.required]],
          });

          if (category.productsId) {
            this.targetProducts = this.sourceProducts.filter((product => category.productsId?.includes(product.id)));
            this.sourceProducts = this.sourceProducts.filter((product => !category.productsId?.includes(product.id)));
          }
        }
      });
    }
    else {
      this.form = this.fb.group({
        id: [0],
        name: [undefined, [Validators.required]],
      });
    }
  }

  onSubmit(): void {
    console.log(JSON.stringify(this.form?.value));

    let targetProductsId: number[] = this.targetProducts.map(item=> item.id);

    const category: ICategory = {
      id: this.form?.value.id ?? 0,
      name: this.form?.value.name ?? "",
      productsId: targetProductsId,
      products: this.targetProducts
    }

    if (this.form?.value.id) {
      this.updateSub = this.categoriesService.updateCategory(this.form?.value.id, category).subscribe({
        next: category => {
          console.log(category);
          this.messageService.add({severity:'success', summary:'Service Message', detail:'This category is updated'});
        }
      })
    }
    else {
      this.sub = this.categoriesService.createCategories(category).subscribe({
        next: category => {
          console.log(category);
          this.messageService.add({severity:'success', summary:'Service Message', detail:'This category is created'});
        }
      });
    }
  }

  delete(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if(id) {
      this.deleteSub = this.categoriesService.deleteCategory(id).subscribe({
        next: (category: ICategory) => {
          this.category = category;

          this.form = this.fb.group({
            id: [category.id],
            name: [category.name, [Validators.required]],
          });
          this.messageService.add({severity:'success', summary:'Service Message', detail:'This category is removed'});
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.getByIdSub?.unsubscribe();
    this.deleteSub?.unsubscribe();
    this.updateSub?.unsubscribe();
  }
}
