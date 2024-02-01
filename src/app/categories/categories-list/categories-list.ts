import {IProduct} from "../../products/products-list/products-list";

export interface ICategory {
  id: number;
  name: string;
  productsId: number[] | undefined;
  products: IProduct[] | undefined;
}
