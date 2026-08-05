"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { totalLessonCount } from "@/lib/courses";
import { useProgress } from "@/lib/progress-context";

const TOTAL_LESSONS = totalLessonCount();

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-sm font-semibold py-1.5 border-b-2 transition-colors"
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

  return (
    <nav className="sticky top-0 z-10 flex items-center gap-7 px-8 py-3.5 bg-bg border-b border-border">
      <Link href="/" className="flex items-center gap-2.5 mr-auto">
        <Image src="/logo.png" alt="SoroLearn" width={28} height={28} className="rounded-md" />
        <span className="text-lg font-extrabold tracking-tight text-ink">SoroLearn</span>
      </Link>

      <NavLink href="/courses" active={pathname === "/" || pathname.startsWith("/course")}>
        Courses
      </NavLink>
      <NavLink href="/leaderboard" active={pathname === "/leaderboard"}>
        Leaderboard
      </NavLink>
      <NavLink href="/certificate" active={pathname === "/certificate"}>
        Certificate
      </NavLink>

      <div className="text-xs font-semibold text-ink-muted bg-surface-alt px-3 py-1.5 rounded-pill">
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
    </nav>
  );
}
