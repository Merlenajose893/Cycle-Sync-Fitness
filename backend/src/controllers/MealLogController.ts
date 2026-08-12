import { injectable, inject } from "tsyringe";
import { TOKENS } from "../container/tokens.js";
import type { IMealLogService } from "../interfaces/services/IMealLogService.js";
import type { Request, Response, NextFunction } from "express";
import { successResponse } from "../utils/response.js";
import { HttpStatus } from "../constants/HttpStatus.js";

@injectable()
export class MealLogController {

    constructor(
        @inject(TOKENS.IMealLogService)
        private readonly mealLogService: IMealLogService
    ) { }



    logMeal = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        try {

            const userId = req.user?.userId!;


            const {
                date,
                ...mealData
            } = req.body;

            const parsedDate = date ? new Date(date) : new Date();
            const validDate = isNaN(parsedDate.getTime()) ? new Date() : parsedDate;

            const result =
                await this.mealLogService.logMeal(
                    userId,
                    validDate,
                    mealData
                );


            successResponse(
                res,
                "Meal is logged",
                result,
                HttpStatus.OK
            );


        } catch (error) {

            next(error);

        }

    }



    getDayLog = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        try {

            const userId = req.user?.userId!;


            const date =
                new Date(req.params.date);


            const log: any =
                await this.mealLogService.getDayLog(
                    userId,
                    date
                );

            const doc = log?.toObject ? log.toObject() : log;
            let totalCalories = 0, totalProtein = 0, totalCarbs = 0, totalFat = 0;
            if (doc && doc.meals && Array.isArray(doc.meals)) {
                doc.meals.forEach((m: any) => {
                    totalCalories += m.totalCalories || 0;
                    totalProtein += m.totalProtein || 0;
                    totalCarbs += m.totalCarbs || 0;
                    totalFat += m.totalFat || 0;
                });
            }

            const formattedResult = {
                ...doc,
                target: doc?.dailyTarget || { calories: 0, protein: 0, carbs: 0, fats: 0 },
                summary: {
                    totalCalories,
                    totalProtein,
                    totalCarbs,
                    totalFat
                }
            };

            successResponse(
                res,
                "Day log fetched",
                formattedResult,
                HttpStatus.OK
            );


        } catch (error) {

            next(error);

        }

    }



    getWeekLogs = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        try {

            const userId = req.user?.userId!;


            const startDate =
                new Date(req.params.startDate);


            const endDate =
                new Date(req.query.endDate as string);


            const result =
                await this.mealLogService.getWeekLogs(
                    userId,
                    startDate,
                    endDate
                );


            successResponse(
                res,
                "Week logs fetched",
                result,
                HttpStatus.OK
            );


        } catch (error) {

            next(error);

        }

    }



    removeMeal = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        try {

            const userId = req.user?.userId!;


            const { mealType } = req.params;

            const result =
                await this.mealLogService.removeMeal(
                    userId,
                    mealType 
                );


            successResponse(
                res,
                "Meal removed successfully",
                result,
                HttpStatus.OK
            );


        } catch (error) {

            next(error);

        }

    }



    setDailyTarget = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        try {

            const userId = req.user?.userId!;


            const {
                date,
                ...target
            } = req.body;

            const parsedDate = date ? new Date(date) : new Date();
            const validDate = isNaN(parsedDate.getTime()) ? new Date() : parsedDate;

            const result =
                await this.mealLogService.setDailyTarget(
                    userId,
                    validDate,
                    target
                );


            successResponse(
                res,
                "Daily target set",
                result,
                HttpStatus.OK
            );


        } catch (error) {

            next(error);

        }

    }


}