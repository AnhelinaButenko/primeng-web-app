import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {ManufacturersListService} from "./manufacturers-list.service";
import {IManufacturer} from "./manufacturers-list";

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
  private _listFilter = '';
  manufacturers!: any[];

  isLoading = false;

  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredManufacturers = this.performFilter(value);
  }

  filteredManufacturers: IManufacturer[] = [];
  manufacturersList: IManufacturer[] = [];

  constructor(private manufacturersService: ManufacturersListService,
              private route: ActivatedRoute,
              private router: Router,
              private messageService: MessageService) {}

  performFilter(filterBy: string): IManufacturer[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.manufacturersList.filter((manufacturer: IManufacturer) =>
      manufacturer.name.toLocaleLowerCase().includes(filterBy));
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.sub = this.manufacturersService.getManufacturers().subscribe({
      next: manufacturers => {
        this.manufacturersList = manufacturers;
        this.filteredManufacturers = this.manufacturersList;

        this.isLoading = false;
      },
      error: err => this.errorMessage = err
    });
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
