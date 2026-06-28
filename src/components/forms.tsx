"use client";

import { useState, type FormEvent } from "react";

const inputCls =
  "w-full border border-border bg-white/70 px-4 py-3 text-[16px] text-ink outline-none transition-colors focus:border-coral";

interface ContactFormProps {
  email: string;
}

export function ContactForm({ email }: ContactFormProps) {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const from = String(data.get("email") || "");
    const message = String(data.get("message") || "");
    const subject = encodeURIComponent(`Enquiry from ${name || "the website"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${from}`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input name="name" placeholder="Your name" required className={inputCls} />
        <input name="email" type="email" placeholder="Your email" required className={inputCls} />
      </div>
      <textarea name="message" rows={5} placeholder="How can Niki help you mellow out?" required className={inputCls} />
      <button
        type="submit"
        className="bg-coral px-8 py-3 text-[15px] text-white transition-opacity hover:opacity-90"
      >
        Send enquiry
      </button>
      {sent && (
        <p className="text-[15px] text-ink/70">
          Opening your email app… if nothing happens, email{" "}
          <a className="text-coral underline" href={`mailto:${email}`}>{email}</a>.
        </p>
      )}
    </form>
  );
}

export function NewsletterForm({ email }: { email: string }) {
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const from = String(data.get("email") || "");
    const subject = encodeURIComponent("Newsletter signup");
    const body = encodeURIComponent(`Please add me to the mellow movement newsletter: ${from}`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setDone(true);
  }

  if (done) {
    return (
      <p className="text-[17px] text-ink/80">
        Thanks for joining the mellow movement — check your email app to confirm.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
      <input
        name="email"
        type="email"
        required
        placeholder="Email address"
        className={`${inputCls} sm:flex-1`}
      />
      <button
        type="submit"
        className="bg-coral px-8 py-3 text-[15px] text-white transition-opacity hover:opacity-90"
      >
        Sign up
      </button>
    </form>
  );
}
