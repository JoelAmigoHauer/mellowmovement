import Link from "next/link";

interface CtaBannerProps {
  headline: string;
  buttonLabel?: string;
  buttonHref?: string;
}

// Coral "Ready to mellow out?" banner reused at the foot of content pages.
export function CtaBanner({
  headline,
  buttonLabel = "Book Appointment",
  buttonHref = "/book",
}: CtaBannerProps) {
  return (
    <section className="bg-coral py-20 text-center text-white md:py-28">
      <div className="page-inset flex flex-col items-center gap-8">
        <h2 className="max-w-[900px] text-white text-[clamp(2rem,5vw,3.5rem)] leading-[1.2]">
          {headline}
        </h2>
        <Link
          href={buttonHref}
          className="bg-white px-9 py-4 text-[15px] text-coral transition-opacity hover:opacity-90"
        >
          {buttonLabel}
        </Link>
      </div>
    </section>
  );
}
