import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Coberturas } from "@/components/coberturas"
import { HowItWorks } from "@/components/how-it-works"
import { Differentiators } from "@/components/differentiators"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col pt-0">
      <Header />
      <Hero />
      <About />
      <Coberturas />
      <HowItWorks />
      <Differentiators />
      <ContactSection />
      <Footer />
    </main>
  )
}
