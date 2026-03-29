import AddServiceForm from '@/components/add-service/AddServiceForm'

export default function AddServicePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Add a Service</h1>
        <p className="text-sm text-[var(--muted)] mt-1">
          Add any tool or service you use to your dashboard
        </p>
      </div>
      <AddServiceForm />
    </div>
  )
}
