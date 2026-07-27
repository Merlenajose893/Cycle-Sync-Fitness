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
logMeal(userId: string, date: Date, mealData: LogMealDTO): Promise<IMealLog> {
    let mealLog=await this.mealRepository.findByUserAndDate(userId,date);
    const totalMeals=this.calculateMealTotals(mealData.food)
    const mealEntry:IMealEntry={
        mealType:mealData.mealType,
        foods:mealData.food,
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



    
    getDayLog=async(userId: string, date: Date): Promise<IMealLog | null> {
        const mealLog=await this.mealRepository.findByUserAndDate(userId,date);
        if(!mealLog)
        {
            throw new NotFoundError("Meal Log Not Found");
        }
        return mealLog;
    }

    getWeekLogs=async(userId: string, startDate: Date,endDate:Date): Promise<IMealLog[]> {
        const mealLog=await this.mealRepository.findByUserDateRange(userId,startDate,endDate);
        return mealLog
    }

    removeMeal=async(userId: string, mealType: string): Promise<IMealLog | null> {
        const mealLog=await this.mealRepository.findByUserAndDate(userId,new Date());
        if(!mealLog)
        {
            throw new NotFoundError("Meal log is not found")
        }

        mealLog.meals=mealLog.meals.filter((meal)=>meal.mealType!==mealType);
        return this.mealRepository.save(mealLog);
    }

    setDailyTarget=async(userId: string, date: Date, target: DailyTargetDTO): Promise<IMealLog> {
        let mealLog=await this.mealRepository.findByUserAndDate(userId,date);
        if(!mealLog)
        {
            mealLog=await this.mealRepository.create({
                userId,
                date,
                meals:[],
                dailyTarget:target
            } as Partial<IMealLog>)
            return mealLog;
        }
        mealLog.dailyTarget=target;
        return await this.mealRepository.save(mealLog);
    }

    private calculateMealTotals(foods:IFoodItem[])
    {
        return foods.reduce((total,food)=>{
            total.calories+=food.calories,
            total.carbs+=food.carbs,
            total.protein+=food.protein,
            total.fat+=food.fat
            return total;

        },{calories:0,carbs:0,protein:0,fat:0})
    }
    
}