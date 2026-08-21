import type { ReportAnalytics, ReportRange } from "../../dtos/report.dto.js";


export interface IReportService{
    generateUserReport(userId:string,range:ReportRange):Promise<ReportAnalytics>;
    exportUser(userId:string,range:ReportRange):Promise<string>;

}