import { z } from 'zod'

export const routineSchema = z.object({
  name: z.string().min(1, { message: 'A routine name is required.' }),
  description: z
    .string()
    .min(1, { message: 'A short description is required.' }),
})

export type RoutineInfo = z.infer<typeof routineSchema>
