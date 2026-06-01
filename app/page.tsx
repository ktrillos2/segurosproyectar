import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { HowItWorks } from "@/components/how-it-works"
import { Differentiators } from "@/components/differentiators"
import { Footer } from "@/components/footer"
import { client } from "@/sanity/lib/client"

export const revalidate = 60

export default async function HomePage() {
  const heroData = await client.fetch(`*[_type == "hero"][0]{
    ...,
    backgroundVideo {
      asset-> {
        url
      }
    }
  }`)
  const howItWorksData = await client.fetch(`*[_type == "howItWorks"][0]`)
  const differentiatorsData = await client.fetch(`*[_type == "differentiators"][0]`)
  const globalConfigData = await client.fetch(`*[_type == "globalConfig"][0]`)

  return (
    <main className="min-h-screen flex flex-col pt-0">
      <Header />
      <Hero data={heroData} />
      <HowItWorks data={howItWorksData} />
      <Differentiators data={differentiatorsData} />
      <Footer data={globalConfigData} />
    </main>
  )
}
