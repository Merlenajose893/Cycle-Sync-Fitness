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
import { inject } from "tsyringe";
import { TOKENS } from "../container/tokens.js";
import { successResponse } from "../utils/response.js";
import { HttpStatus } from "../constants/HttpStatus.js";
let UserAccountController = class UserAccountController {
    userstatusservice;
    constructor(userstatusservice) {
        this.userstatusservice = userstatusservice;
    }
    changePassword = async (req, res, next) => {
        try {
            const userId = req.user?.userId;
            const result = await this.userstatusservice.changePassword(userId, req.body);
            successResponse(res, "Password is changed successfully", HttpStatus.OK, result);
        }
        catch (error) {
            next(error);
        }
    };
    deleteAccount = async (req, res, next) => {
        try {
            const userId = req.user?.userId;
            const result = await this.userstatusservice.deleteAccount(userId, req.body);
            successResponse(res, "Account deleted successfully", HttpStatus.OK, result);
        }
        catch (error) {
            next(error);
        }
    };
};
UserAccountController = __decorate([
    __param(0, inject(TOKENS.IUserStatusService)),
    __metadata("design:paramtypes", [Object])
], UserAccountController);
export { UserAccountController };
//# sourceMappingURL=UserAccountController.js.map