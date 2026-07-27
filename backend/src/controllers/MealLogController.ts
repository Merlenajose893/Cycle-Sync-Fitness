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


            const result =
                await this.mealLogService.logMeal(
                    userId,
                    new Date(date),
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


            const result =
                await this.mealLogService.getDayLog(
                    userId,
                    date
                );


            successResponse(
                res,
                "Day log fetched",
                result,
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


            const { mealType } = req.body;


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


            const result =
                await this.mealLogService.setDailyTarget(
                    userId,
                    new Date(date),
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