export class DailyForDayUserDto {
  userId?: number;
  caloriesLeft?: number;
  caloriesConsumed?: number;
  dailyMeals?: DailyMeal[];
  proteinsConsumed?: number;
  fatsConsumed?: number;
  carbohydratesConsumed?: number;
  breakfastProductId?: number;
  lunchProductId?: number;
  dinnerProductId?: number;
}

export class DailyMeal {
  mealName?: string;
  productConsumptions?: ProductConsumption[];
}

export class ProductConsumption {
  productId?: number;
  productName?: string;
  caloriesConsumed?: number;
  gramsConsumed?: number;
  proteinsConsumed?: number;
  fatsConsumed?: number;
  carbohydratesConsumed?: number;
}
