"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { totalLessonCount } from "@/lib/courses";
import { useProgress } from "@/lib/progress-context";

const TOTAL_LESSONS = totalLessonCount();

function NavLink({
  href,
  active,
  onClick,
  className = "",
  children,
}: {
  href: string;
  active: boolean;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`text-sm font-semibold py-1.5 border-b-2 transition-colors ${className}`}
      style={{
        color: active ? "var(--color-text)" : "var(--color-text-muted)",
        borderColor: active ? "var(--color-accent)" : "transparent",
      }}
    >
      {children}
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme, completed } = useProgress();
  const completedCount = Object.keys(completed).length;
  const isDark = theme === "dark";
  const [menuOpen, setMenuOpen] = useState(false);

  const linkIsActive = {
    courses: pathname === "/" || pathname.startsWith("/course"),
    leaderboard: pathname === "/leaderboard",
    certificate: pathname === "/certificate",
  };

  return (
    <nav className="sticky top-0 z-10 bg-bg border-b border-border">
      <div className="flex items-center gap-4 md:gap-7 px-4 md:px-8 py-3.5">
        <Link href="/" className="flex items-center gap-2.5 mr-auto">
          <Image src="/logo.png" alt="SoroLearn" width={28} height={28} className="rounded-md" />
          <span className="text-lg font-extrabold tracking-tight text-ink">SoroLearn</span>
        </Link>

        <div className="hidden md:flex items-center gap-7">
          <NavLink href="/courses" active={linkIsActive.courses}>
            Courses
          </NavLink>
          <NavLink href="/leaderboard" active={linkIsActive.leaderboard}>
            Leaderboard
          </NavLink>
          <NavLink href="/certificate" active={linkIsActive.certificate}>
            Certificate
          </NavLink>
        </div>

        <div className="text-xs font-semibold text-ink-muted bg-surface-alt px-3 py-1.5 rounded-pill whitespace-nowrap">
          {completedCount}/{TOTAL_LESSONS} lessons
        </div>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="relative flex-shrink-0 w-[42px] h-6 rounded-pill bg-surface-alt border border-border"
        >
          <span
            className="absolute top-0.5 w-[18px] h-[18px] rounded-full bg-accent transition-all"
            style={{ left: isDark ? "20px" : "2px" }}
          />
        </button>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-menu"
          className="md:hidden flex-shrink-0 w-9 h-9 flex flex-col items-center justify-center gap-1 rounded-btn hover:bg-surface-alt transition"
        >
          <span className="w-5 h-0.5 bg-ink" />
          <span className="w-5 h-0.5 bg-ink" />
        </button>
      </div>

      {menuOpen && (
        <div id="mobile-nav-menu" className="md:hidden flex flex-col gap-1 px-4 pb-4 border-t border-border pt-3">
          <NavLink href="/courses" active={linkIsActive.courses} onClick={() => setMenuOpen(false)} className="py-2">
            Courses
          </NavLink>
          <NavLink
            href="/leaderboard"
            active={linkIsActive.leaderboard}
            onClick={() => setMenuOpen(false)}
            className="py-2"
          >
            Leaderboard
          </NavLink>
          <NavLink
            href="/certificate"
            active={linkIsActive.certificate}
            onClick={() => setMenuOpen(false)}
            className="py-2"
          >
            Certificate
          </NavLink>
        </div>
      )}
    </nav>
  );
}
