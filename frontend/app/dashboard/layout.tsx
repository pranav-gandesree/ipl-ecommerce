import Navbar from "@/components/canvas/Navbar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
     <Navbar/>
      <main className="pt-16 pb-8 px-4">
        <div className="container mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
