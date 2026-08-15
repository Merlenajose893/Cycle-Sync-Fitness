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
import { injectable, inject } from "tsyringe";
import { TOKENS } from "../container/tokens.js";
import { successResponse } from "../utils/response.js";
import { HttpStatus } from "../constants/HttpStatus.js";
let MealLogController = class MealLogController {
    mealLogService;
    constructor(mealLogService) {
        this.mealLogService = mealLogService;
    }
    logMeal = async (req, res, next) => {
        try {
            const userId = req.user?.userId;
            const { date, ...mealData } = req.body;
            const parsedDate = date ? new Date(date) : new Date();
            const validDate = isNaN(parsedDate.getTime()) ? new Date() : parsedDate;
            const result = await this.mealLogService.logMeal(userId, validDate, mealData);
            successResponse(res, "Meal is logged", result, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
    getDayLog = async (req, res, next) => {
        try {
            const userId = req.user?.userId;
            const date = new Date(req.params.date);
            const log = await this.mealLogService.getDayLog(userId, date);
            const doc = log?.toObject ? log.toObject() : log;
            let totalCalories = 0, totalProtein = 0, totalCarbs = 0, totalFat = 0;
            if (doc && doc.meals && Array.isArray(doc.meals)) {
                doc.meals.forEach((m) => {
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
            successResponse(res, "Day log fetched", formattedResult, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
    getWeekLogs = async (req, res, next) => {
        try {
            const userId = req.user?.userId;
            const startDate = new Date(req.params.startDate);
            const endDate = new Date(req.query.endDate);
            const result = await this.mealLogService.getWeekLogs(userId, startDate, endDate);
            successResponse(res, "Week logs fetched", result, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
    removeMeal = async (req, res, next) => {
        try {
            const userId = req.user?.userId;
            const { mealType } = req.params;
            const result = await this.mealLogService.removeMeal(userId, mealType);
            successResponse(res, "Meal removed successfully", result, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
    setDailyTarget = async (req, res, next) => {
        try {
            const userId = req.user?.userId;
            const { date, ...target } = req.body;
            const parsedDate = date ? new Date(date) : new Date();
            const validDate = isNaN(parsedDate.getTime()) ? new Date() : parsedDate;
            const result = await this.mealLogService.setDailyTarget(userId, validDate, target);
            successResponse(res, "Daily target set", result, HttpStatus.OK);
        }
        catch (error) {
            next(error);
        }
    };
};
MealLogController = __decorate([
    injectable(),
    __param(0, inject(TOKENS.IMealLogService)),
    __metadata("design:paramtypes", [Object])
], MealLogController);
export { MealLogController };
//# sourceMappingURL=MealLogController.js.map