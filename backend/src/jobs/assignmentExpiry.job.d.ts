import type { ITrainerAssignmentService } from "../interfaces/services/ITrainerAssignmentService.js";
import type { IAssignmentExpiryScheduler } from "../interfaces/jobs/IAssignmentExpiryScheduler.js";
export declare class AssignmentExpiryScheduler implements IAssignmentExpiryScheduler {
    private assignmentService;
    constructor(assignmentService: ITrainerAssignmentService);
    start(): void;
    private run;
}
//# sourceMappingURL=assignmentExpiry.job.d.ts.map