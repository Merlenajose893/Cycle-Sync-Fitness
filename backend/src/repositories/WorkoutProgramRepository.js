import { WorkoutProgram } from "../models/WorkoutProgram.js";
import { BaseRepository } from "./BaseRepository.js";
export class WorkoutProgramRepository extends BaseRepository {
    constructor() {
        super(WorkoutProgram);
    }
    async findByTrainer(trainerId) {
        return this.model.find({ trainerId, isArchived: false });
    }
    async findActiveForUsers(userId) {
        return this.model.findOne({ assignedUserId: userId, isArchived: false });
    }
    async findTemplates(filter) {
        return this.model.find({ isTemplate: true, isArchived: true, ...filter });
    }
    async update(programId, data) {
        return this.model.findByIdAndUpdate(programId, data, { new: true });
    }
    async delete(programId) {
        return this.model.findByIdAndUpdate(programId, { isArchived: true }, { new: true });
    }
}
//# sourceMappingURL=WorkoutProgramRepository.js.map