import { injectable, inject } from "tsyringe";
import type { Request, Response, NextFunction } from "express";
import type { IReportService } from "../interfaces/services/IReportService.ts";
import type { IReportController } from "../interfaces/controllers/IReportController.ts";
import { TOKENS } from "../container/tokens.ts";
import { successResponse } from "../utils/response.ts";
import { HttpStatus } from "../constants/HttpStatus.ts";
import type { ReportRange } from "../dtos/report.dto.ts";

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

      console.log(`[ReportController] 📊 Analytics requested for User: ${userId} | Range: ${range}`);

      const report = await this.reportService.generateUserReport(userId, range);

      console.log(`[ReportController] ✅ Analytics generated successfully for User: ${userId}`);

      successResponse(res, "User report analytics generated successfully", report, HttpStatus.OK);
    } catch (error) {
      console.error("ReportController getUserReport Error:", error);
      next(error);
    }
  };

  exportUserReport = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user?.userId || (req.user as any)?.id;
      const range: ReportRange = (req.query.range as ReportRange) || "week";

      console.log(`[ReportController] 📥 CSV Export requested for User: ${userId} | Range: ${range}`);

      const csvData = await this.reportService.exportUser(userId, range);

      console.log(`[ReportController] ✅ CSV Export generated successfully for User: ${userId}`);

      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", `attachment; filename=health_report_${range}.csv`);
      res.status(HttpStatus.OK).send(csvData);
    } catch (error) {
      console.error("ReportController exportUserReport Error:", error);
      next(error);
    }
  };
}
