var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { inject, injectable } from "tsyringe";
import { MealLog } from "../models/MealLog.js";
import { BaseRepository } from "./BaseRepository.js";
let MealLogRepository = class MealLogRepository extends BaseRepository {
    constructor() {
        super(MealLog);
    }
    findByUserAndDate(userId, date) {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);
        return this.model.findOne({
            userId,
            date: { $gte: startOfDay, $lte: endOfDay }
        });
    }
    findByUserDateRange(userId, startDate, endDate) {
        return this.model.find({ userId, date: { $gte: startDate, $lte: endDate } }).sort({ date: 1 });
    }
};
MealLogRepository = __decorate([
    injectable(),
    __metadata("design:paramtypes", [])
], MealLogRepository);
export { MealLogRepository };
//# sourceMappingURL=MealLogRepository.js.map