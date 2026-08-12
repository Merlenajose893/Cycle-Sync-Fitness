import { inject,injectable } from "tsyringe";
import type { IMealLogService } from "../interfaces/services/IMealLogService.js";
import { TOKENS } from "../container/tokens.js";
import type { IFoodItem, IMealEntry, IMealLog } from "../models/MealLog.js";
import type { DailyTargetDTO, LogMealDTO } from "../dtos/meal.log.dto.js";
import type { IMealLogRepository } from "../interfaces/repositories/IMealLogRepository.js";
import { NotFoundError } from "../errors/index.js";
@injectable()
export class MealLogService implements IMealLogService{
    constructor(@inject(TOKENS.IMealLogRepository) private mealRepository:IMealLogRepository)

    {

    }
logMeal=async(userId: string, date: Date, mealData: any): Promise<IMealLog> =>{
    let mealLog=await this.mealRepository.findByUserAndDate(userId,date);
    const rawFoods = mealData.foods || mealData.food || [];
    const foodItems: IFoodItem[] = rawFoods.map((f: any) => ({
        name: f.name || "Food Item",
        quantity: Number(f.quantity || 1),
        unit: f.unit || "serving",
        calories: Number(f.calories || 0),
        protein: Number(f.protein ?? f.proteins ?? 0),
        carbs: Number(f.carbs || 0),
        fat: Number(f.fat ?? f.fats ?? 0)
    }));

    const totalMeals=this.calculateMealTotals(foodItems)
    const mealEntry:IMealEntry={
        mealType:mealData.mealType,
        foods:foodItems,
        totalCalories:totalMeals.calories,
        totalProtein:totalMeals.protein,
        totalCarbs:totalMeals.carbs,
        totalFat:totalMeals.fat,
        loggedAt:new Date()

    }
    if(!mealLog)
    {
        mealLog=await this.mealRepository.create({
            userId,
            date,
            meals:[
                mealEntry
            ],
            dailyTarget:{
                calories:0,
                carbs:0,
                protein:0,
                fats:0
            },

        }as Partial<IMealLog>)

        return mealLog

    }
    const existingMeal=mealLog?.meals.findIndex((meal)=>meal.mealType===mealData.mealType)
    if(existingMeal!==-1)
    {
        mealLog.meals[existingMeal]=mealEntry;
    }
    else{
        mealLog.meals.push(mealEntry);
    }


    return this.mealRepository.save(mealLog)
}



    
    getDayLog=async(userId: string, date: Date): Promise<IMealLog | null> =>{
        const mealLog=await this.mealRepository.findByUserAndDate(userId,date);
        if(!mealLog)
        {
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
            } as any;
        }
        return mealLog;
    }

    getWeekLogs=async(userId: string, startDate: Date,endDate:Date): Promise<IMealLog[]>=> {
        const mealLog=await this.mealRepository.findByUserDateRange(userId,startDate,endDate);
        return mealLog
    }

    removeMeal=async(userId: string, mealType: string): Promise<IMealLog | null> =>{
        const mealLog=await this.mealRepository.findByUserAndDate(userId,new Date());
        console.log(mealLog);
        
        if(!mealLog)
        {
            throw new NotFoundError("Meal log is not found")
        }

        mealLog.meals=mealLog.meals.filter((meal)=>meal.mealType!==mealType);
        return this.mealRepository.save(mealLog);
    }

    setDailyTarget=async(userId: string, date: Date, target: any): Promise<IMealLog> =>{
        let mealLog=await this.mealRepository.findByUserAndDate(userId,date);
        const fatVal = Number(target.fat ?? target.fats ?? 0);
        const normalizedTarget = {
            calories: Number(target.calories || 0),
            protein: Number(target.protein || 0),
            carbs: Number(target.carbs || 0),
            fats: fatVal,
            fat: fatVal
        };

        if(!mealLog)
        {
            mealLog=await this.mealRepository.create({
                userId,
                date,
                meals:[],
                dailyTarget:normalizedTarget
            } as Partial<IMealLog>)
            return mealLog;
        }
        mealLog.dailyTarget=normalizedTarget as any;
        return await this.mealRepository.save(mealLog);
    }

    private calculateMealTotals(foods:any[])
    {
        const list = Array.isArray(foods) ? foods : [];
        return list.reduce((total,food)=>{
            total.calories += Number(food.calories || 0);
            total.carbs += Number(food.carbs || 0);
            total.protein += Number(food.protein ?? food.proteins ?? 0);
            total.fat += Number(food.fat ?? food.fats ?? 0);
            return total;

        },{calories:0,carbs:0,protein:0,fat:0})
    }
    
}