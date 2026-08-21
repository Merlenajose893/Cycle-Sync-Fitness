import type { Request, Response, NextFunction } from "express";

export interface IReportController {
  getUserReport(req: Request, res: Response, next: NextFunction): Promise<void>;
  exportUserReport(req: Request, res: Response, next: NextFunction): Promise<void>;
}
