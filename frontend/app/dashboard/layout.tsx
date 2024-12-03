import Navbar from "@/components/canvas/Navbar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen ">
     <Navbar/>
      <main className="">
        <div className="container mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
