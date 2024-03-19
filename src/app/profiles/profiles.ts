interface IDailyFoodDairy {
}

export interface IProfile {
  id: number;
  userName: string;
  email: string;
  currentWeight: number;
  desiredWeight: number;
  height: number;
  age: number;
  gender: string;
  activityLevel: string;
  dailyFoodDairyId: number[] | undefined;
  dailyFoodDairy: IDailyFoodDairy[] | undefined;
}
