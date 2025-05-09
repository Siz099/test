import Image from "next/image"

export default function LoginIllustration() {
  return (
    <div className="relative">
      {/* Phone */}
      <div className="w-40 h-64 bg-indigo-800 rounded-xl transform rotate-12 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg">
        <div className="w-full h-4 bg-indigo-900 rounded-t-xl flex items-center justify-start pl-2 space-x-1">
          <div className="w-1 h-1 bg-white rounded-full"></div>
          <div className="w-1 h-1 bg-white rounded-full"></div>
          <div className="w-1 h-1 bg-white rounded-full"></div>
        </div>
      </div>

      {/* Red bar */}
      <div className="w-48 h-8 bg-red-500 rounded-md transform -rotate-12 absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 shadow-md">
        <div className="w-full h-full flex items-center justify-end pr-2 space-x-1">
          <div className="w-1 h-1 bg-white rounded-full"></div>
          <div className="w-1 h-1 bg-white rounded-full"></div>
          <div className="w-1 h-1 bg-white rounded-full"></div>
        </div>
      </div>

      {/* Lock */}
      <div className="w-24 h-28 absolute bottom-0 left-0 transform -translate-x-1/4">
        <div className="w-full h-16 bg-yellow-400 rounded-md relative">
          <div className="w-4 h-6 bg-gray-800 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-sm">
            <div className="w-1 h-1 bg-black absolute bottom-1 left-1/2 transform -translate-x-1/2 rounded-full"></div>
          </div>
        </div>
        <div className="w-10 h-10 border-8 border-yellow-400 rounded-full absolute -top-6 left-1/2 transform -translate-x-1/2"></div>
      </div>

      {/* People */}
      <div className="absolute bottom-0 right-0">
        <Image src="/placeholder.svg?height=120&width=120" alt="People looking at phone" width={120} height={120} />
      </div>
    </div>
  )
}
