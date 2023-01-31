export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number;
          checksum: string;
          finished_at: string | null;
          id: string;
          logs: string | null;
          migration_name: string;
          rolled_back_at: string | null;
          started_at: string;
        };
        Insert: {
          applied_steps_count?: number;
          checksum: string;
          finished_at?: string | null;
          id: string;
          logs?: string | null;
          migration_name: string;
          rolled_back_at?: string | null;
          started_at?: string;
        };
        Update: {
          applied_steps_count?: number;
          checksum?: string;
          finished_at?: string | null;
          id?: string;
          logs?: string | null;
          migration_name?: string;
          rolled_back_at?: string | null;
          started_at?: string;
        };
      };
      Day: {
        Row: {
          dayOfWeek: string;
          id: number;
          routineId: number;
        };
        Insert: {
          dayOfWeek: string;
          id?: number;
          routineId: number;
        };
        Update: {
          dayOfWeek?: string;
          id?: number;
          routineId?: number;
        };
      };
      Exercise: {
        Row: {
          bodyPart: string;
          equipment: string | null;
          gif: string | null;
          id: number;
          name: string;
          target: string | null;
        };
        Insert: {
          bodyPart: string;
          equipment?: string | null;
          gif?: string | null;
          id?: number;
          name: string;
          target?: string | null;
        };
        Update: {
          bodyPart?: string;
          equipment?: string | null;
          gif?: string | null;
          id?: number;
          name?: string;
          target?: string | null;
        };
      };
      ExercisesOnDay: {
        Row: {
          dayId: number;
          exerciseId: number;
          id: number;
          name: string;
          reps: number;
          sets: number;
          weight: number;
        };
        Insert: {
          dayId: number;
          exerciseId: number;
          id?: number;
          name: string;
          reps: number;
          sets: number;
          weight: number;
        };
        Update: {
          dayId?: number;
          exerciseId?: number;
          id?: number;
          name?: string;
          reps?: number;
          sets?: number;
          weight?: number;
        };
      };
      Routine: {
        Row: {
          authorId: number;
          createdAt: string;
          description: string | null;
          id: number;
          name: string;
        };
        Insert: {
          authorId: number;
          createdAt?: string;
          description?: string | null;
          id?: number;
          name: string;
        };
        Update: {
          authorId?: number;
          createdAt?: string;
          description?: string | null;
          id?: number;
          name?: string;
        };
      };
      User: {
        Row: {
          email: string;
          id: number;
          name: string;
          routineId: number | null;
        };
        Insert: {
          email: string;
          id?: number;
          name: string;
          routineId?: number | null;
        };
        Update: {
          email?: string;
          id?: number;
          name?: string;
          routineId?: number | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
