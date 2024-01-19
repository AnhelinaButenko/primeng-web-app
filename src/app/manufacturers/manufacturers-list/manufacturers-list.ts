import {IProduct} from "../../products/products-list/products-list";

export interface IManufacturer {
  id: number;
  name: string;
  productsId: number[] | undefined;
  products: IProduct[] | undefined;
}
