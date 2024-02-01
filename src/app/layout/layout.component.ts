import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit{
  items: MenuItem[] | undefined;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Products',
        icon: 'pi pi-shopping-bag',
        command: async () => {
          await this.router.navigate(['products/list']);
        },
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-plus',
          },
          {
            label: 'Delete',
            icon: 'pi pi-fw pi-trash'
          },
          {
            separator: true
          },
          {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
        items: [
          {
            label: 'Save',
            icon: 'pi pi-fw pi-calendar-plus'
          },
          {
            label: 'Delete',
            icon: 'pi pi-fw pi-calendar-minus'
          }
        ]
        },
          {
            label: 'Search',
            icon: 'pi pi-fw pi-users',
            items: [
              {
                label: 'Filter',
                icon: 'pi pi-fw pi-filter',
              },
              {
                icon: 'pi pi-fw pi-bars',
                label: 'List'
              }
            ]
          },
          {
            label: 'Export',
            icon: 'pi pi-fw pi-external-link'
          }
        ]
      },
      {
        label: 'Manufacturers',
        icon: 'pi pi-fw pi-user',
        command: async () => {
          await this.router.navigate(['manufacturers/list']);
        },
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-user-plus'
          },
          {
            label: 'Delete',
            icon: 'pi pi-fw pi-user-minus'
          },
          {
            separator: true
          },
          {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
              {
                label: 'Save',
                icon: 'pi pi-fw pi-calendar-plus'
              },
              {
                label: 'Delete',
                icon: 'pi pi-fw pi-calendar-minus'
              }
            ]
          },
          {
            label: 'Search',
            icon: 'pi pi-fw pi-users',
            items: [
              {
                label: 'Filter',
                icon: 'pi pi-fw pi-filter',
              },
              {
                icon: 'pi pi-fw pi-bars',
                label: 'List'
              }
            ]
          },
          {
            label: 'Export',
            icon: 'pi pi-fw pi-external-link'
          }
        ]
      },
      {
        label: 'Category',
        icon: 'pi pi-shopping-bag',
        command: async () => {
          await this.router.navigate(['categories/list']);
        }
      },
    ];
  }
}
