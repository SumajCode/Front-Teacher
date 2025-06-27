import DocenteLoader from "@/lib/DocenteLoader"

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen px-6 py-10 sm:px-20 sm:py-24 gap-12 font-[family-name:var(--font-geist-sans)] bg-gradient-to-b from-white to-gray-100 text-gray-800">
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-indigo-600 underline decoration-indigo-400">
        SumajCode
      </h1>

      <DocenteLoader />
    </div>
  )
}
