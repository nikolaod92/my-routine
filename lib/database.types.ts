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
          routineId: string | null
        }
        Insert: {
          dayOfWeek: string
          id?: number
          routineId?: string | null
        }
        Update: {
          dayOfWeek?: string
          id?: number
          routineId?: string | null
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
          id: number
          name: string
          reps: number
          sets: number
          weight: number
        }
        Insert: {
          dayId: number
          exerciseId: number
          id?: number
          name: string
          reps: number
          sets: number
          weight: number
        }
        Update: {
          dayId?: number
          exerciseId?: number
          id?: number
          name?: string
          reps?: number
          sets?: number
          weight?: number
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
          authorId: string | null
          created_at: string | null
          description: string | null
          id: string
          name: string | null
        }
        Insert: {
          authorId?: string | null
          created_at?: string | null
          description?: string | null
          id: string
          name?: string | null
        }
        Update: {
          authorId?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string | null
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
  }
}
