import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Coberturas } from "@/components/coberturas"
import { Faq } from "@/components/faq"

export default function CoberturasPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <Coberturas />
      <Faq />
      <Footer />
    </main>
  )
}
