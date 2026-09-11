import type { AIPlanResponseDTO, CreateAIPlanDTO } from "../dtos/aiPlan.dto.ts";
import type { IAIPlan } from "../models/AIPlan.ts";

export class AIPlannerMapper {
static createAIPlan(dto:CreateAIPlanDTO)
{
    return {
userId:dto.userId,
status:dto.status,
inputs:dto.inputs,
summary:dto.summary,
workoutPlan:dto.workoutPlan,
mealPlan:dto.mealPlan,
recommendation:dto.recommendations
    }
}


static aiPlanResponse(dto:IAIPlan):AIPlanResponseDTO
{
return{
    id:dto._id.toString(),
    userId:dto.userId.toString(),
    status:dto.status,
    inputs:dto.inputs,
    summary:dto.summary,
    workoutPlan:dto.workoutPlan,
    mealPlan:dto.mealPlan,
    recommendations:dto.recommendations,
    createdAt:dto.createdAt,
    updatedAt:dto.updatedAt

}
}

static toAIPlanResponseList(dto:IAIPlan[]):AIPlanResponseDTO[]{
    return dto.map((d)=>this.aiPlanResponse(d))
}

}