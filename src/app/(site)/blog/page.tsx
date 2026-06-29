import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { ArrowRightIcon } from "@/components/icons";
import { getSiteContent } from "@/lib/getSiteContent";

export const metadata: Metadata = {
  title: "Blog — mellow movement",
  description: "Tips and insights on massage, yoga and mellowing out from Niki at mellow movement.",
};

export default async function BlogPage() {
  const { posts } = await getSiteContent();

  return (
    <main className="flex-1">
      <PageHero title="Blog" />

      <section className="page-inset grid grid-cols-1 gap-x-12 gap-y-16 py-16 md:grid-cols-2 md:py-24">
        {posts.map((post) => (
          <article key={post.slug} className="group flex flex-col">
            <Link href={`/blog/${post.slug}`} className="overflow-hidden">
              <Image
                src={post.image.src}
                alt={post.image.alt}
                width={1200}
                height={800}
                sizes="(max-width: 768px) 100vw, 45vw"
                className="aspect-[3/2] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </Link>
            <h2 className="mt-6 text-coral text-[clamp(1.6rem,3vw,2.2rem)]">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="mt-3 text-[17px] leading-[1.65] text-ink/80">{post.excerpt}</p>
            <Link
              href={`/blog/${post.slug}`}
              className="arrow-link mt-4 inline-flex items-center gap-3 text-[15px] uppercase tracking-[0.15em]"
            >
              Read More
              <ArrowRightIcon className="h-2.5 w-8 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
