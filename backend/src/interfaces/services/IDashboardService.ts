import type { DashboardResponseDTO } from "../../dtos/dashboard.dto.js";
export interface IDashboardService{
    getDashboard(userId:string):Promise<DashboardResponseDTO>
}