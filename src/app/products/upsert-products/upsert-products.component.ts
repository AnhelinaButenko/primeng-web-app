import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IProduct} from "../products-list/products-list";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductsService} from "../products-list/products.service";
import {MessageService} from "primeng/api";
import {ManufacturersListService} from "../../manufacturers/manufacturers-list/manufacturers-list.service";
import {IManufacturer} from "../../manufacturers/manufacturers-list/manufacturers-list";

@Component({
  selector: 'app-upsert-products',
  templateUrl: './upsert-products.component.html',
  styleUrls: ['./upsert-products.component.scss']
})
export class UpsertProductsComponent implements OnInit, OnDestroy {
  sub: Subscription | undefined;
  getByIdSub: Subscription | undefined;
  updateSub: Subscription | undefined;
  deleteSub: Subscription | undefined;
  product: IProduct | undefined;
  manufacturers: IManufacturer[] = [];
  form: FormGroup | undefined = undefined;

  constructor(private productsService: ProductsService, private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private messageService: MessageService,
              private manufacturersListService: ManufacturersListService) {
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.manufacturersListService.getManufacturers().subscribe((manufacturers: IManufacturer[]) => {
      this.manufacturers = manufacturers;
    });

    if (id) {
      this.getByIdSub = this.productsService.getById(id).subscribe({
        next: (product: IProduct) => {
          if (product) {
            this.product = product;

            this.form = this.fb.group({
              id: [product.id],
              name: [product.name, [Validators.required]],
              caloriePer100g: [product.caloriePer100g, [Validators.required]],
              proteinPer100g: [product.proteinPer100g, [Validators.required]],
              fatPer100g: [product.fatPer100g, [Validators.required]],
              carbohydratePer100g: [product.carbohydratePer100g, [Validators.required]],
              manufacturerId: [product.manufacturerId],
            });
          }
        }
      });
    } else {
      this.form = this.fb.group({
        id: [undefined, [Validators.required]],
        name: [undefined, [Validators.required]],
        caloriePer100g: [undefined, [Validators.required]],
        proteinPer100g: [undefined, [Validators.required]],
        fatPer100g: [undefined, [Validators.required]],
        carbohydratePer100g: [undefined, [Validators.required]],
        manufacturerId: [undefined],
      });
    }
  }

  onSubmit(): void {
    console.log(JSON.stringify(this.form?.value));

    if (this.form?.value.id) {
      this.updateSub = this.productsService.updateProduct(this.form?.value.id, this.form?.value).subscribe({
        next: product => {
          console.log(product);
          this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'This product is updated' });
        }
      });
    } else {
      this.sub = this.productsService.createProducts(this.form?.value).subscribe({
        next: product => {
          console.log(product);
          this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'This product is created' });
        }
      });
    }
  }

  delete(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.deleteSub = this.productsService.deleteProduct(id).subscribe({
        next: (product: IProduct) => {
          if (product) {
            this.product = product;

            this.form = this.fb.group({
              id: [product.id],
              name: [product.name, [Validators.required]],
              caloriePer100g: [product.caloriePer100g, [Validators.required]],
              proteinPer100g: [product.proteinPer100g, [Validators.required]],
              fatPer100g: [product.fatPer100g, [Validators.required]],
              carbohydratePer100g: [product.carbohydratePer100g, [Validators.required]],
            });
            this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'This product is removed' });
          }
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
