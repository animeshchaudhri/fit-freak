import { Challenges } from "@/components/challenges/challenges"
import Image from "next/image"

export default function ChallengesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold lg:text-3xl">Challenges</h1>
          <p className="text-gray-400 mt-1">Join and track your fitness challenges</p>
        </div>
        <div className="flex gap-4">
          <select className="bg-gray-800/50 border-0 rounded-lg px-4 py-2">
            <option>All Challenges</option>
            <option>Active</option>
            <option>Completed</option>
          </select>
        </div>
      </div>

      {/* Featured Challenge */}
      <div className="relative h-[200px] lg:h-[300px] rounded-2xl overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&auto=format&fit=crop&q=60"
          alt="Featured Challenge"
          className="w-full h-full object-cover"
          width={800}
          height={300}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center p-8">
          <div className="max-w-xl">
            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium mb-4 inline-block">
              Featured Challenge
            </span>
            <h2 className="text-2xl lg:text-3xl font-bold mb-2">Summer Fitness Challenge</h2>
            <p className="text-gray-200 mb-4">Join thousands of others in this 30-day challenge</p>
            <button className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg transition-colors">
              Join Now
            </button>
          </div>
        </div>
      </div>

      <Challenges />
    </div>
  )
}

