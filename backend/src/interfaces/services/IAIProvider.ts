export interface IAIProvider{
    generateContent(prompt:string):Promise<string>;
}