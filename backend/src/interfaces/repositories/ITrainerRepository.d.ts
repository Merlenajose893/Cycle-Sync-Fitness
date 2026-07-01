import type { ITrainer } from "../../models/Trainer.js";
import type { IBaseRepository } from "./IBaseRepository.js";
export interface ITrainerRepository extends IBaseRepository<ITrainer> {
    findByEmail(email: string): Promise<ITrainer | null>;
}
//# sourceMappingURL=ITrainerRepository.d.ts.map