export type MuscleGroup =
  Database['public']['Views']['distinct_muscle_group']['Row']

export type Exercise = Database['public']['Tables']['exercise']['Row']

export type DayOfWeek = Database['public']['Enums']['day_of_week']

export type Routine = Database['public']['Tables']['routine']['Row']

type ExerciseWithoutRoutineId = Omit<
  Database['public']['Tables']['exercises_on_day']['Row'],
  'routine_id'
>

export type ExerciseOnDayInsert =
  Database['public']['Tables']['exercises_on_day']['Insert']

export type ExerciseOnDay = ExerciseWithoutRoutineId & {
  name: string
}

export type RoutineExercise = Omit<
  Database['public']['Tables']['exercises_on_day']['Row'],
  'routine_id' | 'exercise_id'
> & {
  exercise: Database['public']['Tables']['exercise']['Row']
}
export type User = Database['public']['Tables']['profile']['Row']

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
      }
      exercise: {
        Row: {
          equipment: string | null
          gif: string | null
          id: number
          muscle_group: string
          name: string
          target: string | null
        }
        Insert: {
          equipment?: string | null
          gif?: string | null
          id?: number
          muscle_group: string
          name: string
          target?: string | null
        }
        Update: {
          equipment?: string | null
          gif?: string | null
          id?: number
          muscle_group?: string
          name?: string
          target?: string | null
        }
      }
      exercises_on_day: {
        Row: {
          day_of_week: Database['public']['Enums']['day_of_week']
          exercise_id: number
          reps: number
          routine_id: string
          sets: number
        }
        Insert: {
          day_of_week: Database['public']['Enums']['day_of_week']
          exercise_id: number
          reps: number
          routine_id: string
          sets: number
        }
        Update: {
          day_of_week?: Database['public']['Enums']['day_of_week']
          exercise_id?: number
          reps?: number
          routine_id?: string
          sets?: number
        }
      }
      profile: {
        Row: {
          avatar: string | null
          created_at: string | null
          email: string
          id: string
          name: string | null
          routine_id: string | null
        }
        Insert: {
          avatar?: string | null
          created_at?: string | null
          email: string
          id?: string
          name?: string | null
          routine_id?: string | null
        }
        Update: {
          avatar?: string | null
          created_at?: string | null
          email?: string
          id?: string
          name?: string | null
          routine_id?: string | null
        }
      }
      routine: {
        Row: {
          author_id: string | null
          created_at: string | null
          description: string | null
          follower_count: number
          id: string
          name: string
        }
        Insert: {
          author_id?: string | null
          created_at?: string | null
          description?: string | null
          follower_count?: number | null
          id?: string
          name: string
        }
        Update: {
          author_id?: string | null
          created_at?: string | null
          description?: string | null
          follower_count?: number | null
          id?: string
          name?: string
        }
      }
    }
    Views: {
      distinct_equipment: {
        Row: {
          equipment: string | null
        }
      }
      distinct_muscle_group: {
        Row: {
          muscle_group: string | null
        }
      }
      distinct_target: {
        Row: {
          target: string | null
        }
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      day_of_week: 'm' | 'tu' | 'w' | 'th' | 'f' | 'sa' | 'su'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
