export class MealProductDto {
  id?: number;
  dailyFoodDairyId?: number;
  productId?: number;
  productWeightGr?: number;
  mealName?: string;
  productName?: string;
  mealProductId?: number;
}

export interface MealProductSummaryRequestDto {
  mealProductId?: number;
  userId?: number;
  dateTime: string | null;
}
