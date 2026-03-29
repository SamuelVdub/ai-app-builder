'use client'

import { useFormState } from 'react-dom'
import { addCustomServiceAction } from '@/actions/services'
import SubmitButton from '@/components/ui/SubmitButton'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function AddServiceForm() {
  const [state, action] = useFormState(addCustomServiceAction, null)

  return (
    <div className="max-w-lg">
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8">
        <form action={action} className="space-y-5">
          <Input
            label="Service name"
            id="name"
            name="name"
            type="text"
            placeholder="e.g. Planetscale, Railway, Netlify"
            required
            error={state?.fieldErrors?.name}
          />

          <Input
            label="URL"
            id="url"
            name="url"
            type="url"
            placeholder="https://example.com"
            required
            error={state?.fieldErrors?.url}
          />

          <div className="flex flex-col gap-1.5">
            <label htmlFor="description" className="text-sm font-medium text-[var(--foreground)]">
              Description <span className="text-[var(--muted)] font-normal">(optional)</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              placeholder="What does this service do?"
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] transition-colors resize-none focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
            />
            {state?.fieldErrors?.description && (
              <p className="text-xs text-[var(--error)]">{state.fieldErrors.description}</p>
            )}
          </div>

          {state?.error && (
            <p className="text-sm text-[var(--error)] bg-[var(--error)]/10 border border-[var(--error)]/20 rounded-lg px-4 py-3">
              {state.error}
            </p>
          )}

          <div className="flex gap-3 pt-1">
            <SubmitButton>Add service</SubmitButton>
            <Button type="button" variant="secondary" onClick={() => window.history.back()}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
