import { useState,useEffect } from "react";
import type { Trainer } from "../../types/auth.types";

const PendingTrainer=()=>{
const [trainer,setTrainer]=useState<Trainer[]>();
const {getPendingTrainers,approveTrainer,rejectTrainer,loading,error} = useAdminAuth();
const loadPendingTrainers=async () => {
    const data=await getPendingTrainers();
    setTrainer(data);
}
useEffect(()=>{
loadPendingTrainers();
},[])
const handleApprove = async (trainerId: string) => {
    await approveTrainer(trainerId);
    await loadPendingTrainers();
};
const handleReject = async (trainerId: string) => {
    await rejectTrainer(trainerId, "Profile does not meet requirements");
    await loadPendingTrainers();
};

return(
    <div>
        {trainer.map((trainer) => (
    <div key={trainer._id}>
        <h3>
            {trainer.firstName} {trainer.lastName}
        </h3>

        <p>{trainer.email}</p>

        <p>{trainer.speciality}</p>

        <p>{trainer.status}</p>

        <button onClick={()=>handleApprove(trainer._id)}> Approve</button>

        <button onClick={()=>handleReject(trainer._id)}>Reject</button>
    </div>
))}
    </div>
)

}
