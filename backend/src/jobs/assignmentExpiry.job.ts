import cron from "node-cron";
import type { ITrainerAssignmentService } from "../interfaces/services/ITrainerAssignmentService.js";

import type { IAssignmentExpiryScheduler } from "../interfaces/jobs/IAssignmentExpiryScheduler.js";
import { inject, injectable } from "tsyringe";
import { TOKENS } from "../container/tokens.js";
@injectable()
export class AssignmentExpiryScheduler implements IAssignmentExpiryScheduler{
    constructor(@inject(TOKENS.ITrainerAssignmentService)private assignmentService:ITrainerAssignmentService)
    {

    }
    start()
    {
        cron.schedule("0 0 * * *",async () => {
            await this.run();
        })
        console.log("Assignmnet expiry scheduler starter");
        
    }

    private async run()
    {
        try {
            const count=await this.assignmentService.processExpiredAssignments();
            console.log(`${count} assignments expired`);
            
        } catch (error) {
            console.error(error);
            
        }
    }
}