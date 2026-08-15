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
import cron from "node-cron";
import { inject, injectable } from "tsyringe";
import { TOKENS } from "../container/tokens.js";
let AssignmentExpiryScheduler = class AssignmentExpiryScheduler {
    assignmentService;
    constructor(assignmentService) {
        this.assignmentService = assignmentService;
    }
    start() {
        cron.schedule("0 0 * * *", async () => {
            await this.run();
        });
        console.log("Assignmnet expiry scheduler starter");
    }
    async run() {
        try {
            const count = await this.assignmentService.processExpiredAssignments();
            console.log(`${count} assignments expired`);
        }
        catch (error) {
            console.error(error);
        }
    }
};
AssignmentExpiryScheduler = __decorate([
    injectable(),
    __param(0, inject(TOKENS.ITrainerAssignmentService)),
    __metadata("design:paramtypes", [Object])
], AssignmentExpiryScheduler);
export { AssignmentExpiryScheduler };
//# sourceMappingURL=assignmentExpiry.job.js.map