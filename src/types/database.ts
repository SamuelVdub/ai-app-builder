export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          created_at: string
        }
        Insert: {
          id: string
          username: string
          created_at?: string
        }
        Update: {
          id?: string
          username?: string
          created_at?: string
        }
      }
      user_services: {
        Row: {
          id: string
          user_id: string
          service_id: string
          connected: boolean
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          service_id: string
          connected?: boolean
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          service_id?: string
          connected?: boolean
          updated_at?: string
        }
      }
      onboarding_progress: {
        Row: {
          id: string
          user_id: string
          step_id: string
          completed_at: string
        }
        Insert: {
          id?: string
          user_id: string
          step_id: string
          completed_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          step_id?: string
          completed_at?: string
        }
      }
      custom_services: {
        Row: {
          id: string
          user_id: string
          name: string
          url: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          url: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          url?: string
          description?: string | null
          created_at?: string
        }
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
