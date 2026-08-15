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
import { inject, injectable } from "tsyringe";
import { TOKENS } from "../container/tokens.js";
import { WeekDay, WorkoutType, MealType } from "../constants/aiPlan.js";
let AIGeneratedService = class AIGeneratedService {
    aiprovider;
    constructor(aiprovider) {
        this.aiprovider = aiprovider;
    }
    generatePlan = async (input) => {
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
        const aiPlan = JSON.parse(cleaned);
        return aiPlan;
    };
};
AIGeneratedService = __decorate([
    injectable(),
    __param(0, inject(TOKENS.IAIProvider)),
    __metadata("design:paramtypes", [Object])
], AIGeneratedService);
export { AIGeneratedService };
//# sourceMappingURL=AIGeneratedService.js.map