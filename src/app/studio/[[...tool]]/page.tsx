import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import { isSanityConfigured } from "@/sanity/env";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

function SetupNotice() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center gap-4 p-8 text-foreground">
      <h1 className="text-3xl text-coral">Connect Sanity to enable the Studio</h1>
      <p className="text-ink/80">
        The CMS Studio is wired up and ready. To activate it, create a free Sanity
        project and add its id to the environment:
      </p>
      <ol className="list-decimal space-y-2 pl-5 text-ink/80">
        <li>
          Run <code className="rounded bg-secondary px-1.5 py-0.5">npx sanity@latest init</code>{" "}
          (or create a project at sanity.io/manage).
        </li>
        <li>
          Set <code className="rounded bg-secondary px-1.5 py-0.5">NEXT_PUBLIC_SANITY_PROJECT_ID</code>{" "}
          and <code className="rounded bg-secondary px-1.5 py-0.5">NEXT_PUBLIC_SANITY_DATASET</code>{" "}
          in <code className="rounded bg-secondary px-1.5 py-0.5">.env.local</code> (see{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5">.env.example</code>).
        </li>
        <li>
          Add this site&apos;s URL to the project&apos;s CORS origins, then reload{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5">/studio</code>.
        </li>
      </ol>
      <p className="text-sm text-ink/60">
        Until then the site renders from bundled content, so nothing is broken.
      </p>
    </main>
  );
}

export default function StudioPage() {
  if (!isSanityConfigured) return <SetupNotice />;
  return <NextStudio config={config} />;
}
