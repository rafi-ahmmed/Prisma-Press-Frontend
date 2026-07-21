import Link from 'next/link';

export default function NotFound() {
   return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 py-24 text-center sm:py-32 lg:px-8">
         <div className="space-y-6">
            {/* Error Code Visual */}
            <p className="text-8xl font-semibold text-blue-600 sm:text-lg">
               404
            </p>

            {/* Core Message */}
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
               Page Not Found
            </h1>
            <p className="mx-auto max-w-md text-base text-gray-600 sm:text-lg">
               Sorry, we couldn’t find the page you’re looking for. It might
               have been moved or deleted.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
               <Link
                  href="/"
                  className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
               >
                  Go Back Home
               </Link>
               <Link
                  href="/support"
                  className="rounded-md border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
               >
                  Contact Support
               </Link>
            </div>
         </div>
      </main>
   );
}
