import { inject,injectable } from "tsyringe";
import type { IMealLogService } from "../interfaces/services/IMealLogService.ts";
import { TOKENS } from "../container/tokens.ts";
import type { IFoodItem, IMealEntry, IMealLog } from "../models/MealLog.ts";
import type { DailyTargetDTO, LogMealDTO } from "../dtos/meal.log.dto.ts";
import type { IMealLogRepository } from "../interfaces/repositories/IMealLogRepository.ts";
import { NotFoundError } from "../errors/index.ts";
import { Types } from "mongoose";
@injectable()
export class MealLogService implements IMealLogService{
    constructor(@inject(TOKENS.IMealLogRepository) private mealRepository:IMealLogRepository)

    {

    }
logMeal=async(userId: string, date: Date, mealData: any): Promise<IMealLog> =>{
    let mealLog=await this.mealRepository.findByUserAndDate(userId,date);
    const foodItems:IFoodItem[]=mealData.foods;
    const totalMeals=foodItems.reduce((acc,curr)=>({
        calories:acc.calories+curr.calories,
        protein:acc.protein+curr.protein,
        carbs:acc.carbs+curr.carbs,
        fat:acc.fat+curr.fat

    }),{calories:0,protein:0,carbs:0,fat:0})

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
            userId: new Types.ObjectId(userId) as any,
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

    }else{
        const existingMealIndex=mealLog.meals.findIndex((m)=>m.mealType===mealData.mealType);
        if(existingMealIndex>-1)
        {
            mealLog.meals[existingMealIndex]=mealEntry
        }
        else{
            mealLog.meals.push(mealEntry)
        }
    }
    return await this.mealRepository.save(mealLog);
    
}
getDayLog=async(userId: string, date: Date): Promise<IMealLog | null>=> {
    const log=await this.mealRepository.findByUserAndDate(userId,date);
    if(!log)
    {
        return null;
    }
    return log;
    
}

getWeekLogs=async(userId: string, startDate: Date, endDate: Date): Promise<IMealLog[]> =>{
    const logs=await this.mealRepository.findByUserDateRange(userId,startDate,endDate);
    return logs;
}
removeMeal=async(userId: string, mealType: "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK"): Promise<IMealLog> =>{
    const today=new Date();
    const mealLog=await this.mealRepository.findByUserAndDate(userId,today);
    if(!mealLog)
    {
        throw new NotFoundError("Meal log not found for today")
    }

    mealLog.meals=mealLog.meals.filter((m)=>m.mealType!==mealType);
    return await this.mealRepository.save(mealLog)
    
}

setDailyTarget=async(userId: string, date: Date, target: DailyTargetDTO): Promise<IMealLog>=> {
        let mealLog=await this.mealRepository.findByUserAndDate(userId,date);
        const fatVal = Number(target.fats || (target as any).fat || 0);
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
                userId: new Types.ObjectId(userId) as any,
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