import { injectable, inject } from "tsyringe";
import type { Request, Response, NextFunction } from "express";
import type { IReportService } from "../interfaces/services/IReportService.js";
import type { IReportController } from "../interfaces/controllers/IReportController.js";
import { TOKENS } from "../container/tokens.js";
import { successResponse } from "../utils/response.js";
import { HttpStatus } from "../constants/HttpStatus.js";
import type { ReportRange } from "../dtos/report.dto.js";

@injectable()
export class ReportController implements IReportController {
  constructor(
    @inject(TOKENS.IReportService)
    private readonly reportService: IReportService
  ) {}

  getUserReport = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user?.userId || (req.user as any)?.id;
      const range: ReportRange = (req.query.range as ReportRange) || "week";

      const report = await this.reportService.generateUserReport(userId, range);

      successResponse(res, "User report analytics generated successfully", report, HttpStatus.OK);
    } catch (error) {
      next(error);
    }
  };

  exportUserReport = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user?.userId || (req.user as any)?.id;
      const range: ReportRange = (req.query.range as ReportRange) || "week";

      const csvData = await this.reportService.exportUser(userId, range);

      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", `attachment; filename=health_report_${range}.csv`);
      res.status(HttpStatus.OK).send(csvData);
    } catch (error) {
      next(error);
    }
  };
}
