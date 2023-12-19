import {IProduct} from "../../products/products-list/products-list";

export interface IManufacturer {
  id: number;
  productsId: number[] | undefined;
  name: string;
}
