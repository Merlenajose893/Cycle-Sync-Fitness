import axiosInstance from "../../api/axios";
import { API_ENDPOINTS } from "../../constants/apiEndpoints";
import type { CreateProgramPayload,UpdateProgramPayload,WorkoutProgram } from "../../types/workout.types";
export const workoutProgramService={
  createProgram:async(data:CreateProgramPayload):Promise<WorkoutProgram>=>{
const response=await axiosInstance.post(API_ENDPOINTS.WORKOUT_PROGRAMS.BASE,data);
return response.data.data;
  },

  getTrainerPrograms:async ():Promise<WorkoutProgram[]> => {
    const response=await axiosInstance.get(API_ENDPOINTS.WORKOUT_PROGRAMS.TRAINER);
    return response.data.data;
  },
  getActivePrograms:async ():Promise<WorkoutProgram|null> => {
    const response=await axiosInstance.get(API_ENDPOINTS.WORKOUT_PROGRAMS.ACTIVE)
    return response.data.data;
  },
  updateProgram:async (id:string,data:UpdateProgramPayload):Promise<WorkoutProgram> => {
    const response=await axiosInstance.put(API_ENDPOINTS.WORKOUT_PROGRAMS.BY_ID(id),data);
    return response.data.data;
  },
  deleteProgram:async (id:string):Promise<void> => {
    return await axiosInstance.delete(API_ENDPOINTS.WORKOUT_PROGRAMS.BY_ID(id));
  },
  assignProgram:async (programId:string,userId:string):Promise<WorkoutProgram> => {
    const response=await axiosInstance.post(API_ENDPOINTS.WORKOUT_PROGRAMS.ASSIGN(programId),{userId});
    return response.data.data
  }

}