import { z } from "zod";

const ConsultantSchema = z.object({
    professionalSummary: z.string().optional(),
    experienceYears: z.number().int().default(0),
    desiredJobTitles: z.array(z.string()).default([]),
    employmentStatus: z.string(),
    industriesOfInterest: z.array(z.string()).default([]),
    education: z.array(z.object({
        degree: z.string(),
        major: z.string(),
        institution: z.string(),
        year: z.number().int(),
    })).default([]),
    certifications: z.array(z.string()).default([]),
    linkedinProfileURL: z.string(),
    portfolioURL: z.string(),
    skillsAndExpertise: z.array(z.string()).default([]),
    resumeCV: z.string(),
})

export default ConsultantSchema;