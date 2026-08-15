var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { inject, injectable } from "tsyringe";
import { TOKENS } from "../container/tokens.js";
import { NotFoundError } from "../errors/index.js";
let MealLogService = class MealLogService {
    mealRepository;
    constructor(mealRepository) {
        this.mealRepository = mealRepository;
    }
    logMeal = async (userId, date, mealData) => {
        let mealLog = await this.mealRepository.findByUserAndDate(userId, date);
        const rawFoods = mealData.foods || mealData.food || [];
        const foodItems = rawFoods.map((f) => ({
            name: f.name || "Food Item",
            quantity: Number(f.quantity || 1),
            unit: f.unit || "serving",
            calories: Number(f.calories || 0),
            protein: Number(f.protein ?? f.proteins ?? 0),
            carbs: Number(f.carbs || 0),
            fat: Number(f.fat ?? f.fats ?? 0)
        }));
        const totalMeals = this.calculateMealTotals(foodItems);
        const mealEntry = {
            mealType: mealData.mealType,
            foods: foodItems,
            totalCalories: totalMeals.calories,
            totalProtein: totalMeals.protein,
            totalCarbs: totalMeals.carbs,
            totalFat: totalMeals.fat,
            loggedAt: new Date()
        };
        if (!mealLog) {
            mealLog = await this.mealRepository.create({
                userId,
                date,
                meals: [
                    mealEntry
                ],
                dailyTarget: {
                    calories: 0,
                    carbs: 0,
                    protein: 0,
                    fats: 0
                },
            });
            return mealLog;
        }
        const existingMeal = mealLog?.meals.findIndex((meal) => meal.mealType === mealData.mealType);
        if (existingMeal !== -1) {
            mealLog.meals[existingMeal] = mealEntry;
        }
        else {
            mealLog.meals.push(mealEntry);
        }
        return this.mealRepository.save(mealLog);
    };
    getDayLog = async (userId, date) => {
        const mealLog = await this.mealRepository.findByUserAndDate(userId, date);
        if (!mealLog) {
            return {
                userId,
                date,
                meals: [],
                dailyTarget: {
                    calories: 0,
                    protein: 0,
                    carbs: 0,
                    fats: 0
                }
            };
        }
        return mealLog;
    };
    getWeekLogs = async (userId, startDate, endDate) => {
        const mealLog = await this.mealRepository.findByUserDateRange(userId, startDate, endDate);
        return mealLog;
    };
    removeMeal = async (userId, mealType) => {
        const mealLog = await this.mealRepository.findByUserAndDate(userId, new Date());
        console.log(mealLog);
        if (!mealLog) {
            throw new NotFoundError("Meal log is not found");
        }
        mealLog.meals = mealLog.meals.filter((meal) => meal.mealType !== mealType);
        return this.mealRepository.save(mealLog);
    };
    setDailyTarget = async (userId, date, target) => {
        let mealLog = await this.mealRepository.findByUserAndDate(userId, date);
        const fatVal = Number(target.fat ?? target.fats ?? 0);
        const normalizedTarget = {
            calories: Number(target.calories || 0),
            protein: Number(target.protein || 0),
            carbs: Number(target.carbs || 0),
            fats: fatVal,
            fat: fatVal
        };
        if (!mealLog) {
            mealLog = await this.mealRepository.create({
                userId,
                date,
                meals: [],
                dailyTarget: normalizedTarget
            });
            return mealLog;
        }
        mealLog.dailyTarget = normalizedTarget;
        return await this.mealRepository.save(mealLog);
    };
    calculateMealTotals(foods) {
        const list = Array.isArray(foods) ? foods : [];
        return list.reduce((total, food) => {
            total.calories += Number(food.calories || 0);
            total.carbs += Number(food.carbs || 0);
            total.protein += Number(food.protein ?? food.proteins ?? 0);
            total.fat += Number(food.fat ?? food.fats ?? 0);
            return total;
        }, { calories: 0, carbs: 0, protein: 0, fat: 0 });
    }
};
MealLogService = __decorate([
    injectable(),
    __param(0, inject(TOKENS.IMealLogRepository)),
    __metadata("design:paramtypes", [Object])
], MealLogService);
export { MealLogService };
//# sourceMappingURL=MeallogService.js.map