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
          dayOfWeek: string
          id: number
          routineId: string
        }
        Insert: {
          dayOfWeek: string
          id?: number
          routineId: string
        }
        Update: {
          dayOfWeek?: string
          id?: number
          routineId?: string
        }
      }
      exercise: {
        Row: {
          bodyPart: string
          equipment: string | null
          gif: string | null
          id: number
          name: string
          target: string | null
        }
        Insert: {
          bodyPart: string
          equipment?: string | null
          gif?: string | null
          id?: number
          name: string
          target?: string | null
        }
        Update: {
          bodyPart?: string
          equipment?: string | null
          gif?: string | null
          id?: number
          name?: string
          target?: string | null
        }
      }
      exercises_on_day: {
        Row: {
          dayId: number
          exerciseId: number
          reps: number
          sets: number
        }
        Insert: {
          dayId: number
          exerciseId: number
          reps: number
          sets: number
        }
        Update: {
          dayId?: number
          exerciseId?: number
          reps?: number
          sets?: number
        }
      }
      profile: {
        Row: {
          created_at: string | null
          email: string
          id: string
          name: string | null
          routineId: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id: string
          name?: string | null
          routineId?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          name?: string | null
          routineId?: string | null
        }
      }
      routine: {
        Row: {
          authorId: string
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          authorId: string
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          authorId?: string
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
