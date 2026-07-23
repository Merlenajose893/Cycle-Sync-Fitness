export interface RecipeFilters{
    category?:string;
    dietType?:string;
    difficulty?:string;
}

export interface ReviewData{
    userId:string;
    rating:number;
    comment?:string;
}