import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactSection } from "@/components/contact-section"

export default function ContactoPage() {
  return (
    <main className="min-h-screen flex flex-col pt-0">
      <Header />
      <ContactSection />
      <Footer />
    </main>
  )
}
