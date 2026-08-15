import type { IAIProvider } from "../../interfaces/services/IAIProvider.js";
export declare class GeminiProvider implements IAIProvider {
    private ai;
    private model;
    constructor();
    generateContent(prompt: string): Promise<string>;
}
//# sourceMappingURL=GeminiProvider.d.ts.map