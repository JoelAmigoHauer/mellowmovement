import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getSiteContent } from "@/lib/getSiteContent";

export default async function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { settings, footer } = await getSiteContent();
  return (
    <>
      <SiteHeader settings={settings} />
      {children}
      <SiteFooter footer={footer} />
    </>
  );
}
