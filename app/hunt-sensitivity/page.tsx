import type { Metadata } from "next";
import { Crosshair } from "lucide-react";
import { SensitivityCalculator } from "@/components/sensitivity-calculator";

export const metadata: Metadata = {
  title: "Hunt: Showdown Sensitivity Calculator | Bloodline Ranks",
  description:
    "Calculate consistent sensitivity values for all scope types in Hunt: Showdown 1896. Improve your aim with precise sensitivity settings.",
  keywords:
    "hunt showdown, hunt showdown 1896, sensitivity calculator, mouse sensitivity, gaming, aim settings, scope sensitivity, fps games, hunt showdown settings",
  openGraph: {
    title: "Hunt: Showdown Sensitivity Calculator | Bloodline Ranks",
    description:
      "Calculate consistent sensitivity values for all scope types in Hunt: Showdown 1896. Improve your aim with precise sensitivity settings.",
    images: [
      {
        url: "/og-image-min.png",
        width: 1200,
        height: 630,
        alt: "Hunt: Showdown Sensitivity Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hunt: Showdown Sensitivity Calculator | Bloodline Ranks",
    description:
      "Calculate consistent sensitivity values for all scope types in Hunt: Showdown 1896.",
    images: ["/og-image-min.png"],
  },
};

export default function HuntSensitivityPage() {
  return (
    <div className="relative min-h-screen bg-background grain">
      {/* Atmospheric fog layers */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div
          className="fog-layer absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"
          style={{ filter: "blur(100px)" }}
        />
        <div
          className="fog-layer-alt absolute inset-0 bg-gradient-to-tl from-accent/8 via-transparent to-primary/3"
          style={{ filter: "blur(80px)" }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 border-b border-border/50 py-16 md:py-24">
        <div className="absolute inset-0 crosshair-bg opacity-10" />
        <div className="container relative mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="reveal-up delay-100 mb-6 font-display text-4xl font-semibold uppercase tracking-wide text-parchment md:text-5xl lg:text-6xl">
              Calculate Your Perfect{" "}
              <span className="text-primary">Sensitivity</span>
            </h1>

            <p className="reveal-up delay-200 mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Get consistent sensitivity across all scope types in Hunt:
              Showdown 1896. No more fighting against unnatural zoom speeds.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="relative z-10 py-12 md:py-16">
        <div className="container mx-auto px-6">
          <SensitivityCalculator />
        </div>
      </section>
    </div>
  );
}
