"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { MenuIcon, CloseIcon } from "@/components/icons";
import type { SiteSettings } from "@/types/content";

interface SiteHeaderProps {
  settings: SiteSettings;
}

export function SiteHeader({ settings }: SiteHeaderProps) {
  const { brand, nav, ctaLabel, ctaHref } = settings;
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Squarespace "fixed + scroll back" header: gains a backdrop once scrolled,
  // hides while scrolling down, reappears when scrolling up.
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 160 && y > lastY);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,box-shadow] duration-300",
        hidden && !menuOpen ? "-translate-y-full" : "translate-y-0",
        scrolled || menuOpen
          ? "bg-cream/95 shadow-[0_1px_0_rgba(0,0,0,0.06)] backdrop-blur-sm"
          : "bg-transparent",
      )}
    >
      <div className="page-inset flex items-center justify-between gap-6 py-[2vw] md:py-6">
        {/* Left: desktop nav */}
        <nav className="hidden flex-1 items-center gap-7 text-[15px] md:flex">
          {nav.map((item) => (
            <Link
              key={item.href + item.label}
              href={item.href}
              className="text-ink/80 transition-colors hover:text-coral"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile: menu toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="text-ink md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>

        {/* Center: brand */}
        <Link
          href="/"
          className="font-[family-name:var(--font-heading)] text-2xl text-coral md:text-[33px] md:leading-none"
          onClick={() => setMenuOpen(false)}
        >
          {brand}
        </Link>

        {/* Right: CTA */}
        <div className="flex flex-1 justify-end">
          <Link
            href={ctaHref}
            className="hidden bg-coral px-6 py-3 text-[15px] text-white transition-opacity hover:opacity-90 md:inline-block"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>

      {/* Mobile menu panel */}
      {menuOpen && (
        <nav className="page-inset flex flex-col gap-1 pb-6 md:hidden">
          {nav.map((item) => (
            <Link
              key={item.href + item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-border/60 py-3 text-lg text-ink/90"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={ctaHref}
            onClick={() => setMenuOpen(false)}
            className="mt-4 bg-coral px-6 py-3 text-center text-white"
          >
            {ctaLabel}
          </Link>
        </nav>
      )}
    </header>
  );
}
