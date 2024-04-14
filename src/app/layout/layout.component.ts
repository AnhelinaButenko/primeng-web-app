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
        label: 'Profile',
        icon: 'pi pi-fw pi-user',
        command: async () => {
          await this.router.navigate(['profile']);
        }
      },
      {
        label: 'Products',
        icon: 'pi pi-shopping-bag',
        command: async () => {
          await this.router.navigate(['products/list']);
        },
      },
      {
        label: 'Manufacturers',
        icon: 'pi pi-fw pi-users',
        command: async () => {
          await this.router.navigate(['manufacturers/list']);
        },
      },
      {
        label: 'Category',
        icon: 'pi pi-shopping-bag',
        command: async () => {
          await this.router.navigate(['categories/list']);
        }
      },
      {
        label: 'Food diary',
        icon: 'pi pi-shopping-bag',
        command: async () => {
          await this.router.navigate(['daily-for-day']);
        }
      },
    ];
  }
}
