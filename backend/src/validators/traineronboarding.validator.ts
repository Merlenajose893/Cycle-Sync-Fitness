import {z} from "zod";
export const updateTrainerProfileSchema=z.object({
    bio:z.object().optional(),
    experience:z.string().optional(),
    location:z.string().optional(),
    avatar:z.string().optional(),
    speciality:z.string().optional(),
    languages:z.array(z.string()).optional(),
    tags:z.array(z.string()).optional(),
});

export const updateTrainerCertificationSchema=z.object({
    certifications:z.array(
        z.object({
            title:z.string().min(1),
            issuedBy:z.string().min(1),
            year:z.string().min(1)
        })
    ),
})

export const updateTrainerPackageSchema=z.object({
    packages:z.array(
        z.object({
            name:z.string().min(1),
            sessions:z.number().positive(),
            duration:z.string().min(1),
            price:z.number().positive(),
            popular:z.boolean().optional()
        })
    )
})