import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { HowItWorks } from "@/components/how-it-works"
import { Differentiators } from "@/components/differentiators"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col pt-0">
      <Header />
      <Hero />
      <HowItWorks />
      <Differentiators />
      <Footer />
    </main>
  )
}
