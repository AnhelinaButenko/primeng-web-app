import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IProduct} from "../products-list/products-list";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductsService} from "../products-list/products.service";

@Component({
  selector: 'app-upsert-products',
  templateUrl: './upsert-products.component.html',
  styleUrls: ['./upsert-products.component.scss']
})
export class UpsertProductsComponent implements OnInit, OnDestroy{

  sub!: Subscription;
  getByIdSub!: Subscription;
  updateSub!: Subscription;
  deleteSub!: Subscription;

  product!: IProduct;

  form: FormGroup| undefined = undefined;

  constructor(private productsService: ProductsService, private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if(id) {
      this.getByIdSub = this.productsService.getById(id).subscribe({
        next: (product: IProduct) => {
          this.product = product;

          this.form = this.fb.group({
            id: [product.id],
            name: [product.name, [Validators.required]],
            caloriePer100g: [product.caloriePer100g, [Validators.required]],
            proteinPer100g: [product.proteinPer100g, [Validators.required]],
            fatPer100g: [product.fatPer100g, [Validators.required]],
            carbohydratePer100g: [product.carbohydratePer100g, [Validators.required]],
          });
        }
      });
    }
    else {
      this.form = this.fb.group({
        id: [0],
        name: [undefined, [Validators.required]],
        caloriePer100g: [undefined, [Validators.required]],
        proteinPer100g: [undefined, [Validators.required]],
        fatPer100g: [undefined, [Validators.required]],
        carbohydratePer100g: [undefined, [Validators.required]],
      });
    }
  }

  onSubmit(): void {
    console.log(JSON.stringify(this.form?.value));

    if (this.form?.value.id) {
      this.updateSub = this.productsService.updateProduct(this.form?.value.id, this.form?.value).subscribe({
        next: product => {
          console.log(product);
        }
      })
    }
    else {
      this.sub = this.productsService.createProducts(this.form?.value).subscribe({
        next: product => {
          console.log(product);
        }
      });
    }
  }

  delete(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if(id) {
      this.deleteSub = this.productsService.deleteProduct(id).subscribe({
        next: (product: IProduct) => {
          this.product = product;

          this.form = this.fb.group({
            id: [product.id],
            name: [product.name, [Validators.required]],
            caloriePer100g: [product.caloriePer100g, [Validators.required]],
            proteinPer100g: [product.proteinPer100g, [Validators.required]],
            fatPer100g: [product.fatPer100g, [Validators.required]],
            carbohydratePer100g: [product.carbohydratePer100g, [Validators.required]],
          });
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
