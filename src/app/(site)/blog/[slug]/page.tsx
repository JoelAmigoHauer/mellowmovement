import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getSiteContent } from "@/lib/getSiteContent";

interface Params {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { posts } = await getSiteContent();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const { posts } = await getSiteContent();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { title: "Blog — mellow movement" };
  return { title: `${post.title} — mellow movement`, description: post.excerpt };
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const { posts } = await getSiteContent();
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <main className="flex-1">
      <article className="page-inset pt-36 pb-20 md:pt-44">
        <div className="mx-auto max-w-3xl">
          <Link href="/blog" className="arrow-link text-[14px] uppercase tracking-[0.15em]">
            ← Back to blog
          </Link>
          <h1 className="mt-6 text-coral text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.15]">
            {post.title}
          </h1>
        </div>

        <div className="mx-auto mt-10 max-w-4xl overflow-hidden">
          <Image
            src={post.image.src}
            alt={post.image.alt}
            width={1500}
            height={1000}
            priority
            sizes="100vw"
            className="aspect-[3/2] w-full object-cover"
          />
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          {post.body.map((block, i) =>
            block.type === "h2" ? (
              <h2 key={i} className="mt-10 mb-3 text-ink text-[clamp(1.4rem,2.6vw,1.9rem)]">
                {block.text}
              </h2>
            ) : (
              <p key={i} className="mb-5 text-[17px] leading-[1.75] text-ink/85">
                {block.text}
              </p>
            ),
          )}
        </div>
      </article>
    </main>
  );
}
