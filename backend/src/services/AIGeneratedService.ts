import { inject, injectable } from "tsyringe";
import type { IAIGeneratorService } from "../interfaces/services/IAIGeneratorService.js";
import type { AiPlanDTO } from "../dtos/aiPlan.dto.js";
import type { AIPlanInputs } from "../models/AIPlan.js";
import { TOKENS } from "../container/tokens.js";
import type { IAIProvider } from "../interfaces/services/IAIProvider.js";
@injectable()
export class AIGeneratedService implements IAIGeneratorService{
constructor(@inject(TOKENS.IAIProvider) private aiprovider:IAIProvider)
{

}

generatePlan=async(input: AIPlanInputs): Promise<AiPlanDTO> =>{
    const prompt=`
Generate a personalized fitness and nutrition plan.

User Details:
- Goal: ${input.goal}
- Fitness Level: ${input.fitnessLevel}
- Workout Days Per Week: ${input.daysPerWeek}
- Diet Preference: ${input.dietPreference}

Return ONLY valid JSON.

The JSON must follow this structure:

{
  "summary": {
    "dailyCalories": number,
    "protein": number,
    "carbs": number,
    "fat": number,
    "waterIntake": number,
    "sleepHours": number
  },

  "workoutPlan": [],

  "mealPlan": [],

  "recommendations": {
    "recovery": "",
    "supplements": [],
    "cycleAdvice": "",
    "notes": ""
  }
}
`;

const response=await this.aiprovider.generateContent(prompt);
  const aiPlan: AiPlanDTO = JSON.parse(response);

    return aiPlan;
}
}