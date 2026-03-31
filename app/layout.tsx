import "./globals.css";
import type { Metadata, Viewport } from "next";
import Link from "next/link";
import Image from "next/image";
import BeverageRecommendationProvider from "@/components/BeverageRecommendationProvider";
import SplashScreen from "@/components/SplashScreen";


export const viewport: Viewport = {
  themeColor: "#121212",
  initialScale: 1,
  width: "device-width",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://wellbecks.example"),
  title: {
    default: "WELLBECKS — Cold-Pressed Juices in Barbados",
    template: "%s — WELLBECKS",
  },
  description:
    "Premium Barbadian cold-pressed juices. Raw, unprocessed, delivered to your door. Order by 8PM for next-day delivery.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    title: "WELLBECKS — Cold-Pressed Juices in Barbados",
    description:
      "Premium Barbadian cold-pressed juices. Raw, unprocessed, delivered to your door.",
    images: [
      { url: "/images/og.jpg", width: 1200, height: 630, alt: "WELLBECKS" },
    ],
  },
  twitter: { card: "summary_large_image", title: "WELLBECKS", description: "Cold-pressed juices in Barbados" },
};

function SkipLink() {
  return (
    <a href="#content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 btn">
      Skip to content
    </a>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <BeverageRecommendationProvider>
        <SkipLink />
        <SplashScreen />
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-ink-100">
          <nav className="container-narrow h-16 flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Wellbecks"
                width={40}
                height={40}
                className="h-9 w-auto"
                priority
              />
              <span className="font-display tracking-tight text-lg">WELLBECKS</span>
            </Link>
            <div className="hidden md:flex items-center gap-6 text-sm">
              <Link href="/menu" className="hover:underline underline-offset-4">Menu</Link>
              <Link href="/cleanse" className="hover:underline underline-offset-4">Cleanse</Link>
              <Link href="/about" className="hover:underline underline-offset-4">About</Link>
              <Link href="/how-ordering-works" className="hover:underline underline-offset-4">How it Works</Link>
              <Link href="/contact" className="hover:underline underline-offset-4">Contact</Link>
            </div>
            <div className="flex items-center gap-2">
              <a href="tel:+12462599636" className="btn hidden sm:inline-flex">Call</a>
              <Link href="/menu" className="btn btn-accent">Order Now</Link>
            </div>
          </nav>
        </header>
        <main id="content">{children}</main>
        <footer className="border-t border-ink-100 mt-20">
          <div className="container-narrow py-10 grid gap-6 md:grid-cols-3">
            <div>
              <div className="font-display text-lg">WELLBECKS</div>
              <p className="text-sm text-ink-600 mt-2">Cold-pressed, raw & unprocessed juices. Made in Barbados.</p>
            </div>
            <div className="text-sm">
              <div className="font-medium">Contact</div>
              <ul className="mt-2 space-y-1">
                <li>Peter Arthur</li>
                <li><a className="hover:underline" href="tel:+12462599636">(246) 259-9636</a></li>
                <li><a className="hover:underline" href="mailto:peterarthur@live.com">peterarthur@live.com</a></li>
              </ul>
            </div>
            <div className="text-sm">
              <div className="font-medium">Follow</div>
              <ul className="mt-2 space-y-1">
                <li>
                  {/* TODO: Add Instagram handle */}
                  <a className="hover:underline" href="#" aria-disabled>
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="container-narrow py-6 text-xs text-ink-600 border-t border-ink-100">
            © {new Date().getFullYear()} WELLBECKS. All rights reserved.
          </div>
        </footer>
        </BeverageRecommendationProvider>
      </body>
    </html>
  );
}
