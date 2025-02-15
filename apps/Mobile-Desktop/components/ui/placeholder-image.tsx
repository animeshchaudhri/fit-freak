import { ImageIcon } from "lucide-react"

interface PlaceholderImageProps {
  className?: string
}

export function PlaceholderImage({ className }: PlaceholderImageProps) {
  return (
    <div className={`flex items-center justify-center bg-gray-800/50 ${className}`}>
      <ImageIcon className="h-8 w-8 text-gray-400" />
    </div>
  )
} 