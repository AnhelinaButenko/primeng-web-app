interface IDailyFoodDairy {
}

export interface IProfile {
  id: number;
  userName: string;
  email?: string;
  currentWeight: number;
  desiredWeight: number;
  height: number;
  age: number;
  gender: number;
  activityLevel: number;
  dailyFoodDairyId?: number[] | undefined;
  dailyFoodDairy?: IDailyFoodDairy[] | undefined;
}
