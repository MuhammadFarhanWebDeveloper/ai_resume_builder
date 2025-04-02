"use client" // Error boundaries must be Client Components

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <div className="space-y-6 max-w-md">
        <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-red-50">
          <AlertTriangle className="h-8 w-8 text-red-500" />
        </div>

        <h2 className="text-2xl font-semibold text-gray-800">Something went wrong!</h2>

        <p className="text-gray-600">
          We're sorry, but we encountered an unexpected error. Our team has been notified.
        </p>

        {process.env.NODE_ENV === "development" && error.message && (
          <div className="p-4 bg-gray-100 rounded-md text-left overflow-auto">
            <p className="text-sm font-mono text-gray-800">{error.message}</p>
            {error.digest && <p className="text-xs font-mono text-gray-500 mt-2">Error ID: {error.digest}</p>}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button onClick={() => reset()} variant="default" className="flex items-center gap-2">
            Try again
          </Button>

          <Link href="/">
            <Button variant="outline" className="flex items-center gap-2">
              Go to homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

