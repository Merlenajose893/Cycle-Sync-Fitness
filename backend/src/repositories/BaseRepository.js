import { Document, Model, Types } from "mongoose";
export class BaseRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    async findById(id) {
        return this.model.findById(id);
    }
    async create(data) {
        return this.model.create(data);
    }
    async save(entity) {
        return entity.save();
    }
    async deleteById(id) {
        await this.model.findByIdAndDelete(id);
    }
    async findAll(page, limit) {
        const skip = (page - 1) * limit;
        return this.model.find().skip(skip).limit(limit);
    }
}
//# sourceMappingURL=BaseRepository.js.map