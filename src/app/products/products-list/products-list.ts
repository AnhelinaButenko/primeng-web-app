import {IManufacturer} from "../../manufacturers/manufacturers-list/manufacturers-list";

export interface IProduct {
  id: number;
  manufacturer: IManufacturer;
  manufacturerId: number;
  name: string;
  caloriePer100g: number;
  proteinPer100g: number;
  fatPer100g: number;
  carbohydratePer100g: number;
}
