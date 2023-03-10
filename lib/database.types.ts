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
      day: {
        Row: {
          day_of_week: Database['public']['Enums']['day_of_week']
          id: number
          routineId: string
        }
        Insert: {
          day_of_week: Database['public']['Enums']['day_of_week']
          id?: number
          routineId: string
        }
        Update: {
          day_of_week?: Database['public']['Enums']['day_of_week']
          id?: number
          routineId?: string
        }
      }
      exercise: {
        Row: {
          body_part: string
          equipment: string | null
          gif: string | null
          id: number
          name: string
          target: string | null
        }
        Insert: {
          body_part: string
          equipment?: string | null
          gif?: string | null
          id?: number
          name: string
          target?: string | null
        }
        Update: {
          body_part?: string
          equipment?: string | null
          gif?: string | null
          id?: number
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
          created_at: string | null
          email: string
          id: string
          name: string | null
          routine_id: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          name?: string | null
          routine_id?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          name?: string | null
          routine_id?: string | null
        }
      }
      routine: {
        Row: {
          author_id: string
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          author_id: string
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          author_id?: string
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
      }
    }
    Views: {
      distinct_body_part: {
        Row: {
          bodyPart: string | null
        }
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      day_of_week: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
