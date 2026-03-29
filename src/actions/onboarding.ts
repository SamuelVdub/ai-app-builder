'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function markStepCompleteAction(stepId: string) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) throw new Error('Unauthorized')

  await supabase.from('onboarding_progress').upsert(
    { user_id: user.id, step_id: stepId, completed_at: new Date().toISOString() } as never,
    { onConflict: 'user_id,step_id' }
  )

  revalidatePath('/onboarding')
}

export async function resetStepAction(stepId: string) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) throw new Error('Unauthorized')

  await supabase
    .from('onboarding_progress')
    .delete()
    .eq('user_id', user.id)
    .eq('step_id', stepId)

  revalidatePath('/onboarding')
}
