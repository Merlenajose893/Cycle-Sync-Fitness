import { Document } from "mongoose";
export interface IBaseRepository <T extends Document>{
    findById(id:string):Promise<T|null>
    create(data:Partial<T>):Promise<T>;
    save(entity:T):Promise<T>;
    deleteById(id:string):Promise<void>;
    findAll(page:number,limit:number):Promise<T[]>;
    
    // updateById(id:string,update:Partial<T>):Promise<T>;
}