import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function CotizarLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      {children}
      <Footer />
    </div>
  )
}
