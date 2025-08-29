import { z } from 'zod';
import { ObjectId } from 'mongodb';

const mongoObjectId = z
  .string()
  .length(24, 'ObjectId must be exactly 24 characters')
  .regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId format')
  .refine((val) => {
    try {
      return ObjectId.isValid(val);
    } catch {
      return false;
    }
  }, 'Invalid Id');

export const jobDetailsSchema = z.object({
  jobType: z
    .enum(['full-time', 'part-time', 'contract', 'freelance'])
    .optional(),
  department: z.string().optional(),
  location: z.string().optional(),
  startDate: z.date().optional(),
  salaryRange: z
    .object({
      min: z.number(),
      max: z.number(),
    })
    .optional(),
  jobDescription: z.string().optional(),
  requirements: z.array(z.string()).optional(),
  requiredSkills: z.array(z.string()).optional(),
  responsibilities: z.array(z.string()).optional(),
});

export const jobDetailIdSchema = z.object({
  id: mongoObjectId,
});

export const jobDetailUpdateSchema = jobDetailIdSchema.merge(
  jobDetailsSchema.partial() // .partial() makes all fields optional
);

export const clientLoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const communityManagerRegisterSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  phoneNumber: z.string().optional(),
  jobTitle: z.string().min(1, 'Job title is required'),
});

export const verifyTokenSchema = z.object({
  token: z.string().min(1, 'Token is required'),
});

export const emailSchema = z.object({
  email: z.string().email('Invalid email format'),
});

export const resetPasswordSchema = verifyTokenSchema.merge(
  z.object({
    password: z.string().min(6, 'Password must be at least 6 characters long'),
  })
);

export const techStacksSchema = z.object({
  stacks: z.array(z.string().min(2)),
});

export const profileUpdateSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  bio: z.string().optional(),
  role: z.string().optional(),
  expectedSalary: z
    .object({
      currency: z.string().optional(),
      amount: z.number().min(0).optional(),
    })
    .optional(),
  jobSearchStatus: z.string().optional(),
  jobAvailability: z.enum(['full-time', 'contract', 'part-time']).optional(),
  location: z.string().optional(),
  timezone: z.string().optional(),
  workHours: z
    .object({
      startHour: z.date().optional(),
      endHour: z.date().optional(),
    })
    .optional(),
  workAdjustable: z.boolean().optional(),
  techStacks: z
    .array(
      z.object({
        skill: z.string(),
        yearsOfExperience: z.number().optional(),
      })
    )
    .optional(),
  englishProficiency: z.string().optional(),
  resume: z.string().optional(),
});

export const noteCreateSchema = jobDetailIdSchema.merge(
  z.object({
    note: z.string().min(5),
  })
);
