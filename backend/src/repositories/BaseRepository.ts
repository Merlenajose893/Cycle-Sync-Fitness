import { Document,Model, Types } from "mongoose";
import type { IBaseRepository } from "../interfaces/repositories/IBaseRepository.js";


export abstract class BaseRepository <T extends Document>implements IBaseRepository<T>{
    constructor(protected readonly model:Model<T>)
    {
        
    }

    async findById(id: string): Promise<T | null> {
        return this.model.findById(id)
    }

    async create(data: Partial<T>): Promise<T> {
        return this.model.create(data)
    }

    async save(entity: T): Promise<T> {
        return entity.save()    }
    async deleteById(id: string): Promise<void> {
        await this.model.findByIdAndDelete(id)
    }

    async findAll(page: number, limit: number): Promise<T[]> {
        const skip=(page-1)*limit;
        return this.model.find().skip(skip).limit(limit)
    }
} 