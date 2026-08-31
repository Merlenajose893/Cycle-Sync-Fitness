import { injectable } from "tsyringe";
import type { IAIProvider } from "../../interfaces/services/IAIProvider.ts";
import { GoogleGenAI, type Model } from "@google/genai";
import { NotFoundError, ServiceUnavailableError } from "../../errors/index.ts";
@injectable()
export class GeminiProvider implements IAIProvider{
private ai:GoogleGenAI;
private  model:string;
constructor()
{
    const apiKey=process.env.GEMINI_API_KEY;
    if(!apiKey)
    {
        throw new NotFoundError("Api key is not found");
    }
    this.ai=new GoogleGenAI({
        apiKey
    })
    this.model=process.env.GEMINI_MODEL!;
    console.log(this.model);
    
}

 async generateContent(prompt: string): Promise<string> {
    const maxRetries = 3;
    let attempt = 0;

    while (attempt < maxRetries) {
      try {
        const response = await this.ai.models.generateContent({
          model: this.model,
          contents: prompt,
        });

        return response.text ?? "";
      } catch (error: any) {
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
}