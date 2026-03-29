'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { redirect } from 'next/navigation'

export async function toggleServiceAction(serviceId: string, connected: boolean) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) throw new Error('Unauthorized')

  await supabase.from('user_services').upsert(
    { user_id: user.id, service_id: serviceId, connected, updated_at: new Date().toISOString() } as never,
    { onConflict: 'user_id,service_id' }
  )

  revalidatePath('/dashboard')
}

const addServiceSchema = z.object({
  name: z.string().min(1, 'Name is required').max(50, 'Name is too long'),
  url: z.string().url('Must be a valid URL (include https://)'),
  description: z.string().max(200, 'Description is too long').optional(),
})

export async function addCustomServiceAction(_prevState: unknown, formData: FormData) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { error: 'You must be logged in.' }

  const raw = {
    name: formData.get('name') as string,
    url: formData.get('url') as string,
    description: (formData.get('description') as string) || undefined,
  }

  const result = addServiceSchema.safeParse(raw)
  if (!result.success) {
    const fieldErrors: Record<string, string> = {}
    result.error.issues.forEach((issue) => {
      fieldErrors[issue.path[0] as string] = issue.message
    })
    return { fieldErrors }
  }

  const { error } = await supabase.from('custom_services').insert({
    user_id: user.id,
    name: result.data.name,
    url: result.data.url,
    description: result.data.description ?? null,
  } as never)

  if (error) return { error: 'Failed to save service. Please try again.' }

  redirect('/dashboard')
}

export async function deleteCustomServiceAction(id: string) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) throw new Error('Unauthorized')

  await supabase.from('custom_services').delete().eq('id', id).eq('user_id', user.id)

  revalidatePath('/dashboard')
}
