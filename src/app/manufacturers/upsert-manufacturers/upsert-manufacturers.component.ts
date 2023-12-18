import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {IManufacturer} from "../manufacturers-list/manufacturers-list";
import {ManufacturersListService} from "../manufacturers-list/manufacturers-list.service";


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

  form: FormGroup| undefined = undefined;
  constructor(private manufacturersService: ManufacturersListService, private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if(id) {
      this.getByIdSub = this.manufacturersService.getById(id).subscribe({
        next: (manufacturer: IManufacturer) => {
          this.manufacturer = manufacturer;

          this.form = this.fb.group({
            id: [manufacturer.id],
            name: [manufacturer.name, [Validators.required]],
          });
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

    if (this.form?.value.id) {
      this.updateSub = this.manufacturersService.updateManufacturer(this.form?.value.id, this.form?.value).subscribe({
        next: manufacturer => {
          console.log(manufacturer);
          this.messageService.add({severity:'success', summary:'Service Message', detail:'This manufacturer is updated'});
        }
      })
    }
    else {
      this.sub = this.manufacturersService.createManufacturers(this.form?.value).subscribe({
        next: manufacturer => {
          console.log(manufacturer);
          this.messageService.add({severity:'success', summary:'Service Message', detail:'This manufacturer is created'});
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

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.getByIdSub?.unsubscribe();
    this.deleteSub?.unsubscribe();
    this.updateSub?.unsubscribe();
  }
}
