import { injectable } from "tsyringe";
import type { IAIProvider } from "../../interfaces/services/IAIProvider.js";
import { GoogleGenAI, type Model } from "@google/genai";
import { NotFoundError } from "../../errors/index.js";
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
    this.model=process.env.GEMINI_MODEL;
}

 async generateContent(prompt: string): Promise<string> {
    const response = await this.ai.models.generateContent({
      model: this.model,
      contents: prompt,
    });

    return response.text ?? "";
  }
}