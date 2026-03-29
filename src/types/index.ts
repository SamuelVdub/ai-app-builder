import type { Database } from './database'

export type Profile = Database['public']['Tables']['profiles']['Row']
export type UserService = Database['public']['Tables']['user_services']['Row']
export type OnboardingProgress = Database['public']['Tables']['onboarding_progress']['Row']
export type CustomService = Database['public']['Tables']['custom_services']['Row']

export interface ServiceCardData {
  id: string
  name: string
  description: string
  url: string
  icon: string
  color: string
  connected: boolean
  isCustom?: boolean
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export type ActionResult<T = void> =
  | { success: true; data?: T }
  | { success: false; error: string; fieldErrors?: Record<string, string> }
