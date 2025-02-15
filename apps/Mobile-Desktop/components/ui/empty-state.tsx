interface EmptyStateProps {
  title: string
  description: string
  icon: React.ElementType
}

export function EmptyState({ title, description, icon: Icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] p-4 text-center">
      <div className="rounded-full bg-gray-800/50 p-4 mb-4">
        <Icon className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 max-w-sm">{description}</p>
    </div>
  )
} 