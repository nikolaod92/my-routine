import { z } from 'zod'
import { DAYS_OF_WEEK } from './constants'

export const routineSchema = z.object({
  name: z.string().min(92, { message: 'A routine name is required.' }),
  description: z
    .string()
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

export type RoutineInfo = z.infer<typeof routineSchema>
