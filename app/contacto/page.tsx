import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactSection } from "@/components/contact-section"
import { client } from "@/sanity/lib/client"

export default async function ContactoPage() {
  const globalConfig = await client.fetch(`*[_type == "globalConfig"][0]`);

  return (
    <main className="min-h-screen flex flex-col pt-0">
      <Header />
      <ContactSection 
        email={globalConfig?.contactEmail}
        address={globalConfig?.contactAddress}
        schedules={globalConfig?.contactSchedules}
      />
      <Footer />
    </main>
  )
}

