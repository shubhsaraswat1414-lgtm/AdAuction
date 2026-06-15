import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="flex min-h-[400px] w-full items-center justify-center p-8">
      <div className="flex flex-col items-center gap-4">
        <div className="relative flex items-center justify-center">
          {/* Outer rotating gradient ring */}
          <div className="absolute h-16 w-16 animate-spin rounded-full border-4 border-transparent border-t-purple-600 border-r-blue-600 opacity-75" />
          {/* Inner pulsating icon */}
          <Loader2 className="h-8 w-8 animate-pulse text-purple-600" />
        </div>
        <div className="text-sm font-medium tracking-wide text-gray-500 animate-pulse">
          Loading module...
        </div>
      </div>
    </div>
  );
}
