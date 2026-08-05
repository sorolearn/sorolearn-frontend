import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ProgressProvider } from "@/lib/progress-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SoroLearn — Learn Soroban Smart Contract Development",
  description:
    "Interactive coding platform for learning Soroban smart contracts on Stellar. Build real contracts in the browser.",
  openGraph: {
    title: "SoroLearn",
    description: "Learn Soroban smart contract development interactively.",
    type: "website",
  },
};

const noFlashThemeScript = `
try {
  var stored = JSON.parse(localStorage.getItem("sorolearn-progress") || "{}");
  document.documentElement.dataset.theme = stored.theme === "dark" ? "dark" : "light";
} catch (e) {}
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashThemeScript }} />
      </head>
      <body className={inter.className}>
        <ProgressProvider>
          <Navbar />
          <main className="min-h-screen bg-bg">{children}</main>
          <Footer />
        </ProgressProvider>
      </body>
    </html>
  );
}
