import { inject, injectable } from "tsyringe";
import type { CreateSubscriptionPlanDTO, UpdateSubscriptionPlanDTO } from "../dtos/subscriptionPlandto.js";
import type { ISubscriptionPlanService } from "../interfaces/services/ISubscriptionPlanService.js";
import type { ISubscriptionPlan } from "../models/SubscriptionPlan.js";
import { TOKENS } from "../container/tokens.js";
import type { ISubscriptionplanRepository } from "../interfaces/repositories/ISubscriptionplanRepository.js";
import type { IStripeBillingGateway } from "../interfaces/gateways/IStripeBillingGateway.js";
import { ConflictError, NotFoundError } from "../errors/index.js";
@injectable()
export class SubscriptionPlanService implements ISubscriptionPlanService{
    constructor(@inject(TOKENS.ISubscriptionPlanRepository) private subscriptionplan:ISubscriptionplanRepository,@inject(TOKENS.IStripeBillingGateway) private gateway:IStripeBillingGateway)
    {

    }
    createPlan=async(data: CreateSubscriptionPlanDTO): Promise<ISubscriptionPlan> =>{
       const existing=await this.subscriptionplan.findByCode(data.code);
       if(existing)
       {
        throw new ConflictError("Subscription plan already exists")
       }
       const interval=data.billingCycle==="annual"?"year":"month";
       const stripeResult=await this.gateway.createProductAndPrice(
        data.name,
        data.price,
        data.currency||"INR",
        interval
       )
       return this.subscriptionplan.create({
        ...data,
        stripeProductId:stripeResult.stripeProductId,
        stripePriceId:stripeResult.stripePriceId,
        isActive:true
       })
    }
    getPlanById=async(id: string): Promise<ISubscriptionPlan>=> {
        const plan=await this.subscriptionplan.findById(id);
        if(!plan)
        {
            throw new NotFoundError("Plan not found")
        }
        return plan;
    }
    updatePlan=async(id: string, data: UpdateSubscriptionPlanDTO): Promise<ISubscriptionPlan | null> =>{
        const plan=await this.subscriptionplan.findById(id);
        const updated=await this.subscriptionplan.update
    }
    getPlanByCode=async(code: string): Promise<ISubscriptionPlan> =>{
        const plan=await this.subscriptionplan.findByCode(code);
        if(!plan)
        {
            throw new NotFoundError("Plan code not found")
        }
        return plan
    }
    getAllPlans=async(): Promise<ISubscriptionPlan[]> =>{
        return this.subscriptionplan.findAll();
    }
    deactivatePlan=async(id: string): Promise<ISubscriptionPlan | null> =>{
        
    }
    getActivePlans=async(): Promise<ISubscriptionPlan[]> =>{
        
    }
}