import type { ICycleLogRepository } from "../interfaces/repositories/ICycleLogRepository.js";
import type { ICyclePredictionService, CyclePredictionResult } from "../interfaces/services/ICyclePredictionService.js";
export declare class CyclePredictionService implements ICyclePredictionService {
    private cycleLogRepository;
    constructor(cycleLogRepository: ICycleLogRepository);
    predictCycle(userId: string): Promise<CyclePredictionResult>;
}
//# sourceMappingURL=CyclePredictionService.d.ts.map