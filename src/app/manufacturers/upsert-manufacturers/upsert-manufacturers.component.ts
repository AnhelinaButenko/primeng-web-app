import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {IManufacturer} from "../manufacturers-list/manufacturers-list";
import {ManufacturersListService} from "../manufacturers-list/manufacturers-list.service";
import {ProductsService} from "../../products/products-list/products.service";
import {IProduct} from "../../products/products-list/products-list";


@Component({
  selector: 'app-upsert-manufacturers',
  templateUrl: './upsert-manufacturers.component.html',
  styleUrls: ['./upsert-manufacturers.component.scss']
})
export class UpsertManufacturersComponent implements OnInit, OnDestroy {

  sub: Subscription | undefined;
  getByIdSub: Subscription | undefined;
  updateSub: Subscription | undefined;
  deleteSub: Subscription | undefined;
  manufacturer: IManufacturer | undefined;
  sourceProducts: IProduct[] = [];
  targetProducts: IProduct[] = [];
  form: FormGroup| undefined = undefined;

  constructor(private manufacturersService: ManufacturersListService, private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private messageService: MessageService,
              private productService: ProductsService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products: IProduct[]) => {
      this.sourceProducts = products;
      this.cdr.markForCheck();
    });

    const id = Number(this.route.snapshot.paramMap.get('id'));

    // const savedProducts = localStorage.getItem(`manufacturer_${id}_products`);

    // if (savedProducts) {
    //   this.targetProducts = JSON.parse(savedProducts);
    // }

    if(id) {
      this.getByIdSub = this.manufacturersService.getById(id).subscribe({
        next: (manufacturer: IManufacturer) => {
          this.manufacturer = manufacturer;

          this.form = this.fb.group({
            id: [manufacturer.id],
            name: [manufacturer.name, [Validators.required]],
          });

          if (manufacturer.productsId) {
            this.targetProducts = this.sourceProducts.filter((product => manufacturer.productsId?.includes(product.id)));
            this.sourceProducts = this.sourceProducts.filter((product => !manufacturer.productsId?.includes(product.id)));
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

    const man: IManufacturer = {
      id: this.form?.value.id ?? 0,
      productsId: targetProductsId,
      name: this.form?.value.name ?? ""
    }

    if (this.form?.value.id) {
      this.updateSub = this.manufacturersService.updateManufacturer(this.form?.value.id, man).subscribe({
        next: manufacturer => {
          console.log(manufacturer);
          this.messageService.add({severity:'success', summary:'Service Message', detail:'This manufacturer is updated'});

          // localStorage.setItem(`manufacturer_${this.form?.value.id}_products`,
          //   JSON.stringify(this.targetProducts));
        }
      })
    }
    else {
      this.sub = this.manufacturersService.createManufacturers(man).subscribe({
        next: manufacturer => {
          console.log(manufacturer);
          this.messageService.add({severity:'success', summary:'Service Message', detail:'This manufacturer is created'});

          // localStorage.setItem(`manufacturer_${this.form?.value.id}_products`,
          //   JSON.stringify(this.targetProducts));
        }
      });
    }
  }

  delete(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if(id) {
      this.deleteSub = this.manufacturersService.deleteManufacturer(id).subscribe({
        next: (manufacturer: IManufacturer) => {
          this.manufacturer = manufacturer;

          this.form = this.fb.group({
            id: [manufacturer.id],
            name: [manufacturer.name, [Validators.required]],
          });
          this.messageService.add({severity:'success', summary:'Service Message', detail:'This manufacturer is removed'});
        }
      });
    }
  }

  // selectedProductsState: any = {};

  // onProductMove(event: any): void {
  //   const movedProduct = event.items[0];
  //   const direction = event.to === this.targetProducts ? 'toSource' : 'toTarget';
  //
  //   if (direction === 'toTarget') {
  //     this.targetProducts.push(movedProduct);
  //     this.sourceProducts = this.sourceProducts.filter(product => product.id !== movedProduct.id);
  //   } else {
  //     this.sourceProducts.push(movedProduct);
  //     this.targetProducts = this.targetProducts.filter(product => product.id !== movedProduct.id);
  //   }
  //
  //   this.saveProductsState();
  // }
  //
  // saveProductsState(): void {
  //   this.selectedProductsState = {
  //     source: this.sourceProducts,
  //     target: this.targetProducts
  //   };
  // }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.getByIdSub?.unsubscribe();
    this.deleteSub?.unsubscribe();
    this.updateSub?.unsubscribe();
  }
}
