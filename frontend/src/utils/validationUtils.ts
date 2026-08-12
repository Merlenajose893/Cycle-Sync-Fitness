import { z } from "zod";

/**
 * 1. Zod helper to parse API error messages from backend responses
 */
export const parseApiErrorMessage = (err: any, fallbackMessage: string = "Something went wrong"): string => {
  if (!err?.response?.data) {
    return err?.message || fallbackMessage;
  }

  const data = err.response.data;

  // Helper function to extract text from a JSON string or object
  const extractMessage = (msg: any): string => {
    if (typeof msg === "string") {
      const trimmed = msg.trim();
      if (trimmed.startsWith("[") || trimmed.startsWith("{")) {
        try {
          const parsed = JSON.parse(trimmed);
          return extractMessage(parsed);
        } catch (e) {
          return msg;
        }
      }
      return msg;
    }

    if (Array.isArray(msg)) {
      return msg
        .map((e: any) => (typeof e === "string" ? extractMessage(e) : e.message || e.msg || String(e)))
        .filter(Boolean)
        .join(". ");
    }

    if (typeof msg === "object" && msg !== null) {
      return msg.message || msg.msg || JSON.stringify(msg);
    }

    return String(msg);
  };

  // Case 1: Message property exists
  if (data.message !== undefined && data.message !== null) {
    return extractMessage(data.message);
  }

  // Case 2: Array of validation errors
  if (Array.isArray(data.errors)) {
    return extractMessage(data.errors);
  }

  // Case 3: Error object
  if (data.error) {
    return extractMessage(data.error);
  }

  return fallbackMessage;
};

/**
 * 2. Zod Schema for User & Trainer DOB Verification (Onboarding & Profile Update)
 */
export const createDobSchema = (minAge: number = 13, roleName: string = "User") => {
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - minAge);

  return z
    .string({ required_error: "Date of birth is required" })
    .min(1, "Date of birth is required")
    .refine(
      (val) => {
        const date = new Date(val);
        return !isNaN(date.getTime());
      },
      { message: "Invalid date format" }
    )
    .refine(
      (val) => {
        const dob = new Date(val);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
          age--;
        }
        return age >= minAge;
      },
      { message: `You must be at least ${minAge} years old to register as a ${roleName}` }
    )
    .refine(
      (val) => {
        const dob = new Date(val);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        return age <= 100;
      },
      { message: "Please select a realistic date of birth" }
    );
};

export const userDobSchema = createDobSchema(13, "User");
export const trainerDobSchema = createDobSchema(18, "Trainer");

/**
 * Helper to compute input `max` attribute (YYYY-MM-DD) for browser date pickers
 */
export const getDobMaxDate = (minAge: number = 13): string => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - minAge);
  return date.toISOString().split("T")[0];
};

/**
 * 3. Zod Schemas for Trainer Certification & Document Validation
 */
export const trainerCertificationSchema = z.object({
  certifications: z
    .string()
    .min(1, "Please specify at least one certification (e.g. NASM, ACE, RDN)")
    .refine(
      (val) => val.split(",").map((c) => c.trim()).filter(Boolean).length > 0,
      "Please enter valid certification titles separated by commas"
    ),
  experience: z.union([z.string(), z.number()]).refine(
    (val) => Boolean(val),
    "Years of experience is required"
  ),
  specialty: z
    .array(z.string())
    .min(1, "Please select at least one area of specialty"),
});

export const documentUploadSchema = z.object({
  idDocument: z
    .custom<File>((val) => val instanceof File, "Government ID document file is required")
    .refine((file) => file.size <= 10 * 1024 * 1024, "ID File size must be under 10MB")
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp", "application/pdf"].includes(file.type),
      "ID Document must be a JPG, PNG, WEBP, or PDF file"
    ),
});

