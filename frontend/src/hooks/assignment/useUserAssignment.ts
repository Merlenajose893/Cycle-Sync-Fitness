import { useState, useCallback } from "react";
import { userAssignmentService } from "../../services/assignment/userAssignmentService";
import axios from "axios";

export const useUserAssignment = () => {
    const [assignment, setAssignment] = useState<any | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchAssignment = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await userAssignmentService.getActiveAssignment();
            setAssignment(data);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || "Failed to fetch assignment");
            } else {
                setError("Unexpected error");
            }
        } finally {
            setLoading(false);
        }
    }, []);

    return { assignment, loading, error, fetchAssignment };
};