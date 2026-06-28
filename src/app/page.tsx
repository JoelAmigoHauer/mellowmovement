import { SiteHeader } from "@/components/SiteHeader";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { StorySection } from "@/components/StorySection";
import { SiteFooter } from "@/components/SiteFooter";
import { getSiteContent } from "@/lib/getSiteContent";

export default async function Home() {
  const { settings, home, footer } = await getSiteContent();

  return (
    <>
      <SiteHeader settings={settings} />
      <main className="flex-1">
        <HeroSection hero={home.hero} />
        <ServicesSection services={home.services} />
        <StorySection story={home.story} />
      </main>
      <SiteFooter footer={footer} />
    </>
  );
}
