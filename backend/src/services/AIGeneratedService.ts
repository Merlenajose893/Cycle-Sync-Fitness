import { inject, injectable } from "tsyringe";
import type { IAIGeneratorService } from "../interfaces/services/IAIGeneratorService.ts";
import type { AiPlanDTO } from "../dtos/aiPlan.dto.ts";
import type { AIPlanInputs } from "../models/AIPlan.ts";
import { TOKENS } from "../container/tokens.ts";
import type { IAIProvider } from "../interfaces/services/IAIProvider.ts";
import { WeekDay,WorkoutType,MealType } from "../constants/aiPlan.ts";
@injectable()
export class AIGeneratedService implements IAIGeneratorService{
constructor(@inject(TOKENS.IAIProvider) private aiprovider:IAIProvider)
{

}
generatePlan = async (input: AIPlanInputs): Promise<AiPlanDTO> => {
  const dayValues = Object.values(WeekDay).join(", ");
  const workoutTypeValues = Object.values(WorkoutType).join(", ");
  const mealTypeValues = Object.values(MealType).join(", ");

  const prompt = `
Generate a personalized fitness and nutrition plan.

User Details:
- Goal: ${input.goal}
- Fitness Level: ${input.fitnessLevel}
- Workout Days Per Week: ${input.daysPerWeek}
- Diet Preference: ${input.dietPreference}

Return ONLY valid JSON. No markdown code fences, no explanations, no extra text before or after the JSON.

Rules:
- "day" fields must use ONLY these exact values: ${dayValues}
- "workoutType" fields must use ONLY these exact values: ${workoutTypeValues}
- "mealType" fields must use ONLY these exact values: ${mealTypeValues}
- Create exactly ${input.daysPerWeek} entries in "workoutPlan", one per training day.
- "exercises" must be an array of OBJECTS (not strings), each with the exact fields shown below.

The JSON must follow this EXACT structure:

{
  "summary": {
    "dailyCalories": number,
    "protein": number,
    "carbs": number,
    "fat": number,
    "waterIntake": number,
    "sleepHours": number
  },
  "workoutPlan": [
    {
      "day": "string, one of the allowed day values",
      "title": "string",
      "duration": number,
      "warmup": { "title": "string", "description": "string", "duration": number },
      "exercises": [
        {
          "name": "string",
          "muscleGroup": "string",
          "workoutType": "string, one of the allowed workoutType values",
          "sets": number,
          "reps": "string",
          "rest": number,
          "tip": "string"
        }
      ],
      "cooldown": { "title": "string", "description": "string", "duration": number }
    }
  ],
  "mealPlan": [
    {
      "day": "string, one of the allowed day values",
      "meals": [
        {
          "mealType": "string, one of the allowed mealType values",
          "name": "string",
          "calories": number,
          "protein": number,
          "carbs": number,
          "fat": number,
          "ingredients": ["string"],
          "notes": "string"
        }
      ]
    }
  ],
  "recommendations": {
    "recovery": "string",
    "supplements": ["string"],
    "cycleAdvice": "string",
    "notes": "string"
  }
}
`;

  const response = await this.aiprovider.generateContent(prompt);
  const cleaned = response.replace(/```json|```/g, "").trim();
  const aiPlan: AiPlanDTO = JSON.parse(cleaned);
  return aiPlan;
};
}