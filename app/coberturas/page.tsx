import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Coberturas } from "@/components/coberturas"
import { Faq } from "@/components/faq"
import { client } from "@/sanity/lib/client"

export default async function CoberturasPage() {
  const data = await client.fetch(`*[_type == "coveragesPage"][0]`);

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <Coberturas 
        heroSubtitle={data?.heroSubtitle}
        heroTitle={data?.heroTitle}
        heroTitleHighlight={data?.heroTitleHighlight}
        heroDescription={data?.heroDescription}
        mainCoverages={data?.mainCoverages}
        complementaryCoverages={data?.complementaryCoverages}
        additionalCoverages={data?.additionalCoverages}
      />
      <Faq 
        faqTitle={data?.faqTitle}
        faqSubtitle={data?.faqSubtitle}
        faqsList={data?.faqs}
      />
      <Footer />
    </main>
  )
}
