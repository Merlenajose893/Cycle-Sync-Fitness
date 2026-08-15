var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { injectable } from "tsyringe";
import { GoogleGenAI } from "@google/genai";
import { NotFoundError, ServiceUnavailableError } from "../../errors/index.js";
let GeminiProvider = class GeminiProvider {
    ai;
    model;
    constructor() {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            throw new NotFoundError("Api key is not found");
        }
        this.ai = new GoogleGenAI({
            apiKey
        });
        this.model = process.env.GEMINI_MODEL;
        console.log(this.model);
    }
    async generateContent(prompt) {
        const maxRetries = 3;
        let attempt = 0;
        while (attempt < maxRetries) {
            try {
                const response = await this.ai.models.generateContent({
                    model: this.model,
                    contents: prompt,
                });
                return response.text ?? "";
            }
            catch (error) {
                attempt++;
                const status = error?.status || error?.response?.status || error?.error?.status;
                // 503 (Service Unavailable) or 429 (Too Many Requests)
                if ((status === 503 || status === 429 || status === "UNAVAILABLE") && attempt < maxRetries) {
                    const delay = Math.pow(2, attempt) * 1000; // 2s, 4s delay
                    console.warn(`[GeminiProvider] API unavailable (status: ${status}). Retrying in ${delay}ms... (Attempt ${attempt}/${maxRetries})`);
                    await new Promise(resolve => setTimeout(resolve, delay));
                    continue;
                }
                console.error("[GeminiProvider] Error generating content:", error);
                throw new ServiceUnavailableError("AI service is currently experiencing high demand or is unavailable. Please try again later.");
            }
        }
        throw new ServiceUnavailableError("AI service is currently experiencing high demand or is unavailable. Please try again later.");
    }
};
GeminiProvider = __decorate([
    injectable(),
    __metadata("design:paramtypes", [])
], GeminiProvider);
export { GeminiProvider };
//# sourceMappingURL=GeminiProvider.js.map