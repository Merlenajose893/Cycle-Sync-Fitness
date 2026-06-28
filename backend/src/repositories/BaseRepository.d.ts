import { Document, Model } from "mongoose";
import type { IBaseRepository } from "../interfaces/repositories/IBaseRepository.js";
export declare abstract class BaseRepository<T extends Document> implements IBaseRepository<T> {
    protected readonly model: Model<T>;
    constructor(model: Model<T>);
    findById(id: string): Promise<T | null>;
    create(data: Partial<T>): Promise<T>;
    save(entity: T): Promise<T>;
    deleteById(id: string): Promise<void>;
    findAll(page: number, limit: number): Promise<T[]>;
}
//# sourceMappingURL=BaseRepository.d.ts.map