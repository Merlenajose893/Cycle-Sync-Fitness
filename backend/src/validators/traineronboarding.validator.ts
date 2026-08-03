import {z} from "zod";
// import { z } from "zod";

export const updateTrainerProfileSchema = z.object({

    bio: z.string()
        .min(100, "Bio must contain at least 100 characters")
        .max(1000, "Bio cannot exceed 1000 characters"),

    experienceYears: z.number()
        .min(0, "Experience cannot be negative")
        .max(50, "Experience cannot exceed 50 years"),

    location: z.string()
        .min(2, "Location is required"),

    avatar: z.string()
        .url("Invalid avatar URL"),

    speciality: z.array(
        z.enum([
            "strength_training",
            "weight_loss",
            "muscle_gain",
            "yoga",
            "crossfit",
            "rehabilitation",
            "nutrition",
            "sports_training"
        ])
    )
    .min(1,"At least one specialization is required"),

    languages:z.array(
        z.string()
    )
    .min(1,"At least one language required")
    .max(5,"Maximum 5 languages allowed"),

    tags:z.array(
        z.string()
    )
    .max(10,"Maximum 10 tags allowed")

});
export const updateTrainerCertificationSchema=z.object({

 certifications:z.array(

    z.object({

        title:z.string()
            .min(3)
            .max(100),

        issuedBy:z.string()
            .min(2)
            .max(100),

        year:z.number()
            .min(1950)
            .max(new Date().getFullYear()),

        certificateUrl:z.string()
            .url()
            .optional()

    })

 )
 .min(1,"At least one certification required")
 .max(10,"Maximum 10 certifications allowed")

});

export const updateTrainerPackageSchema=z.object({

packages:z.array(

z.object({

name:z.string()
.min(3)
.max(50),

sessions:z.number()
.int()
.min(1)
.max(100),

duration:z.enum([
"1_week",
"1_month",
"3_months",
"6_months"
]),


price:z.number()
.min(100,"Minimum package price is 100")
.max(100000,"Maximum price exceeded"),


popular:z.boolean()
.default(false),


mode:z.enum([
"online",
"offline",
"hybrid"
])

})

)

.min(1,"At least one package required")
.max(5,"Maximum 5 packages allowed")

});