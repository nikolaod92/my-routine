import { z } from 'zod'
import { DAYS_OF_WEEK } from './constants'

const MAX_FILE_SIZE = 200000
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

export const routineSchema = z.object({
  name: z
    .string()
    .trim()
    .min(4, { message: 'Name has to be longer than 4 characters.' }),

  description: z
    .string()
    .trim()
    .min(1, { message: 'A short description is required.' }),
})

export const insertExerciseSchema = z
  .object({
    routine_id: z.string(),
    day_of_week: z.enum(DAYS_OF_WEEK),
    exercise_id: z.number(),
    reps: z.number().min(1),
    sets: z.number().min(1),
  })
  .array()
  .nonempty({
    message: "You haven't added any exercises.",
  })

export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z
    .string()
    .trim()
    .min(6, { message: 'Password has to be longer than 6 characters.' }),
})

export const registerSchema = loginSchema
  .extend({
    username: z.string().trim().min(3, { message: 'Username is too short.' }),
    confirm: z.string().trim(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match.",
    path: ['confirm'],
  })

export const updateProfileSchema = z.object({
  username: z
    .string()
    .trim()
    .min(4, { message: 'Name has to be longer than 4 characters.' }),
  avatar: z
    .any()
    .optional()
    .nullable()
    .refine(
      (files) => files?.length === 0 || files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 2MB.`
    )
    .refine(
      (files) =>
        files?.length === 0 || ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png and .webp files are accepted.'
    ),
})

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type RoutineInfo = z.infer<typeof routineSchema>
