import { Button } from "@/components/ui/button";
import {
  Calculator,
  Crosshair,
  ExternalLink,
  TrendingUp,
  Users,
} from "lucide-react";
import { SiDiscord, SiTwitch, SiYoutube } from "react-icons/si";
import Link from "next/link";
import { WebsiteImage } from "@/components/website-image";

function OrnateIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-16 w-16 items-center justify-center">
      {/* Corner decorations */}
      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-accent/60" />
        <div className="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-accent/60" />
        <div className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-accent/60" />
        <div className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-accent/60" />
      </div>
      {children}
    </div>
  );
}

function VictorianDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <Crosshair className="h-4 w-4 text-accent/60" />
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background grain">
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
      <section className="relative z-10 overflow-hidden border-b border-border/50">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(/hunt-hero.jpg)",
          }}
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-background/80" />
        {/* Crosshair grid background */}
        <div className="absolute inset-0 crosshair-bg opacity-20" />

        {/* Vignette effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--background)_80%)]" />

        <div className="container relative mx-auto px-6 py-28 md:py-40">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="reveal-up mb-8 inline-flex items-center gap-3 border border-accent/30 bg-card/50 px-5 py-2.5 backdrop-blur-sm">
              <span className="font-display text-xs uppercase tracking-[0.25em] text-accent">
                For Hunters, By Hunters
              </span>
            </div>

            {/* Main title */}
            <h1 className="reveal-up delay-100 mb-8 font-display text-5xl font-semibold uppercase tracking-wide text-parchment md:text-7xl lg:text-8xl">
              Bloodline
              <span className="relative mx-4 inline-block text-primary">
                Ranks
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="6"
                  viewBox="0 0 200 6"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,3 Q50,0 100,3 T200,3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-primary/60"
                  />
                </svg>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="reveal-up delay-200 mx-auto mb-12 max-w-2xl text-xl leading-relaxed text-muted-foreground md:text-2xl">
              Tools and resources for the{" "}
              <span className="text-parchment">Hunt: Showdown</span>{" "}
              community. Built by hunters who get it.
            </p>

            {/* CTA Buttons */}
            <div className="reveal-up delay-300 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="group relative overflow-hidden border-2 border-primary bg-primary/90 font-display text-sm uppercase tracking-widest text-primary-foreground transition-all hover:bg-primary hover:shadow-[0_0_30px_rgba(196,30,30,0.3)]"
                asChild
              >
                <Link href="https://discord.gg/9KrBNvBH7a" target="_blank">
                  <SiDiscord className="mr-2 h-4 w-4" />
                  Join Discord
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-accent/50 bg-transparent font-display text-sm uppercase tracking-widest text-accent transition-all hover:border-accent hover:bg-accent/10 hover:text-parchment"
                asChild
              >
                <Link
                  href="https://www.youtube.com/@bloodlineranks"
                  target="_blank"
                >
                  <SiYoutube className="mr-2 h-4 w-4" />
                  Watch on YouTube
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom ornate border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      </section>

      {/* Mission Section */}
      <section className="relative z-10 py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl">
            {/* Section header */}
            <div className="reveal-up mb-16 text-center">
              <h2 className="mb-6 font-display text-3xl font-medium uppercase tracking-wide text-parchment md:text-5xl blood-accent">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground">
                Supporting the hunters who make this community thrive
              </p>
            </div>

            {/* Mission card */}
            <div className="reveal-up delay-200 corner-ornament border-2 border-border bg-card/80 p-8 backdrop-blur-sm md:p-12">
              <div className="space-y-6 text-lg leading-relaxed text-foreground">
                <p>
                  Hunt has one of the most dedicated gaming communities out
                  there. Streamers, content creators, and players who pour
                  countless hours into mastering the bayou and sharing that
                  journey with others.
                </p>
                <VictorianDivider className="py-4" />
                <p>
                  We're here to support them. Whether it's building tools that
                  help players improve, tracking community events, or creating
                  platforms for creators to showcase their work we want to give
                  back to the community that makes Hunt special.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="relative z-10 border-y border-border/50 bg-card/30 py-24 md:py-32">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 crosshair-bg opacity-10" />

        <div className="container relative mx-auto px-6">
          {/* Section header */}
          <div className="reveal-up mb-16 text-center">
            <h2 className="mb-6 font-display text-3xl font-medium uppercase tracking-wide text-parchment md:text-5xl blood-accent">
              Arsenal
            </h2>
            <p className="text-lg text-muted-foreground">
              Resources built for the community.
            </p>
          </div>

          {/* Tools grid */}
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
            {/* YouTube Channel */}
            <article className="reveal-up delay-100 group relative border-2 border-border bg-card/80 p-8 backdrop-blur-sm transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_40px_rgba(196,30,30,0.15)]">
              <div className="absolute right-4 top-4 h-2 w-2 rounded-full bg-primary/60 group-hover:animate-pulse" />

              <OrnateIcon>
                <SiYoutube className="h-7 w-7 text-primary" />
              </OrnateIcon>

              <h3 className="mb-3 mt-6 font-display text-xl font-medium uppercase tracking-wide text-parchment">
                Bloodline Ranks Channel
              </h3>
              <p className="mb-6 leading-relaxed text-muted-foreground">
                Weekly highlights and creator spotlights. The best moments from
                across the community.
              </p>

              <Button
                className="w-full border border-primary/30 bg-primary/10 font-display text-xs uppercase tracking-widest text-primary transition-all hover:bg-primary hover:text-primary-foreground"
                asChild
              >
                <Link
                  href="https://www.youtube.com/@bloodlineranks"
                  target="_blank"
                >
                  Visit Channel
                  <ExternalLink className="ml-2 h-3 w-3" />
                </Link>
              </Button>
            </article>

            {/* HuntCET */}
            <article className="reveal-up delay-200 group relative border-2 border-border bg-card/80 p-8 backdrop-blur-sm transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_40px_rgba(196,30,30,0.15)]">
              <div className="absolute right-4 top-4 h-2 w-2 rounded-full bg-accent/60 group-hover:animate-pulse" />

              <OrnateIcon>
                <TrendingUp className="h-7 w-7 text-accent" />
              </OrnateIcon>

              <h3 className="mb-3 mt-6 font-display text-xl font-medium uppercase tracking-wide text-parchment">
                Hunt Event Tracker
              </h3>
              <p className="mb-6 leading-relaxed text-muted-foreground">
                Discord bots for tracking Hunt community event stats, progress,
                and live updates. Never miss a milestone.
              </p>

              <Button
                className="w-full border border-accent/30 bg-accent/10 font-display text-xs uppercase tracking-widest text-accent transition-all hover:bg-accent hover:text-accent-foreground"
                asChild
              >
                <Link href="https://huntcet.com/" target="_blank">
                  Visit HuntCET
                  <ExternalLink className="ml-2 h-3 w-3" />
                </Link>
              </Button>
            </article>

            {/* Sensitivity Calculator */}
            <article className="reveal-up delay-300 group relative border-2 border-border bg-card/80 p-8 backdrop-blur-sm transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_40px_rgba(196,30,30,0.15)]">
              <div className="absolute right-4 top-4 h-2 w-2 rounded-full bg-primary/60 group-hover:animate-pulse" />

              <OrnateIcon>
                <Calculator className="h-7 w-7 text-primary" />
              </OrnateIcon>

              <h3 className="mb-3 mt-6 font-display text-xl font-medium uppercase tracking-wide text-parchment">
                Sensitivity Calculator
              </h3>
              <p className="mb-6 leading-relaxed text-muted-foreground">
                Match your sensitivity across every scope and weapon in the
                game.
              </p>

              <Button
                className="w-full border border-primary/30 bg-primary/10 font-display text-xs uppercase tracking-widest text-primary transition-all hover:bg-primary hover:text-primary-foreground"
                asChild
              >
                <Link
                  href="https://huntsense.bloodlineranks.com/"
                  target="_blank"
                >
                  Launch Calculator
                  <ExternalLink className="ml-2 h-3 w-3" />
                </Link>
              </Button>
            </article>

            {/* Coming Soon */}
            <article className="reveal-up delay-400 relative border-2 border-dashed border-border/50 bg-card/40 p-8 backdrop-blur-sm">
              <OrnateIcon>
                <Crosshair className="h-7 w-7 text-muted-foreground/50" />
              </OrnateIcon>

              <h3 className="mb-3 mt-6 font-display text-xl font-medium uppercase tracking-wide text-muted-foreground">
                More Incoming
              </h3>
              <p className="mb-6 leading-relaxed text-muted-foreground/70">
                Additional tools currently in development. Join the Discord to
                suggest what we should build next.
              </p>

              <Button
                variant="outline"
                disabled
                className="w-full cursor-not-allowed border border-border bg-transparent font-display text-xs uppercase tracking-widest text-muted-foreground"
              >
                In Development
              </Button>
            </article>
          </div>
        </div>
      </section>

      {/* Community CTA Section */}
      <section className="relative z-10 py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="reveal-up mx-auto max-w-3xl text-center">
            <Users className="mx-auto mb-6 h-12 w-12 text-accent/70" />
            <h2 className="mb-6 font-display text-3xl font-medium uppercase tracking-wide text-parchment md:text-5xl blood-accent">
              Join the Hunt
            </h2>
            <p className="mb-10 text-lg leading-relaxed text-muted-foreground md:text-xl">
              Connect with other hunters, share feedback, and get updates on new
              tools. The community shapes what we build.
            </p>

            <Button
              size="lg"
              className="group relative overflow-hidden border-2 border-primary bg-primary/90 font-display text-sm uppercase tracking-widest text-primary-foreground transition-all hover:bg-primary hover:shadow-[0_0_30px_rgba(196,30,30,0.3)]"
              asChild
            >
              <Link href="https://discord.gg/9KrBNvBH7a" target="_blank">
                <SiDiscord className="mr-2 h-4 w-4" />
                Join the Discord Server
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Community Websites Section */}
      <section className="relative z-10 border-t border-border/50 bg-card/20 py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="reveal-up mb-16 text-center">
            <h2 className="mb-6 font-display text-3xl font-medium uppercase tracking-wide text-parchment md:text-5xl blood-accent">
              Community Builds
            </h2>
            <p className="text-lg text-muted-foreground">
              Websites we've built for Hunt creators.
            </p>
          </div>

          <div className="mx-auto max-w-2xl">
            {/* Agent3540 Website */}
            <article className="reveal-up delay-100 group relative border-2 border-border bg-card/80 p-8 backdrop-blur-sm transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_40px_rgba(196,30,30,0.15)]">
              <div className="flex items-start gap-6">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden border-2 border-accent/30 bg-card">
                  <WebsiteImage
                    src="https://agent3540.com/favicon.ico"
                    alt="Agent3540"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 font-display text-xl font-medium uppercase tracking-wide text-parchment">
                    Agent3540
                  </h3>
                  <p className="mb-4 text-sm text-accent">agent3540.com</p>
                  <p className="mb-6 leading-relaxed text-muted-foreground">
                    Custom website for The Agency with schedules, highlights,
                    and social links.
                  </p>
                  <Button
                    className="border border-primary/30 bg-primary/10 font-display text-xs uppercase tracking-widest text-primary transition-all hover:bg-primary hover:text-primary-foreground"
                    asChild
                  >
                    <Link href="https://agent3540.com/" target="_blank">
                      Visit Website
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 py-12">
        <div className="container mx-auto px-6">
          <VictorianDivider className="mb-8" />

          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <p className="font-display text-sm uppercase tracking-widest text-muted-foreground">
              Bloodline Ranks {new Date().getFullYear()}
            </p>

            <div className="flex items-center gap-8">
              <Link
                href="https://www.twitch.tv/acidtib"
                target="_blank"
                aria-label="Bloodline Ranks on Twitch"
                className="group flex items-center gap-2 text-muted-foreground transition-colors hover:text-parchment"
              >
                <SiTwitch className="h-5 w-5 transition-transform group-hover:scale-110" />
                <span className="font-display text-xs uppercase tracking-widest">
                  Twitch
                </span>
              </Link>
              <Link
                href="https://www.youtube.com/@bloodlineranks"
                target="_blank"
                aria-label="Bloodline Ranks on YouTube"
                className="group flex items-center gap-2 text-muted-foreground transition-colors hover:text-parchment"
              >
                <SiYoutube className="h-5 w-5 transition-transform group-hover:scale-110" />
                <span className="font-display text-xs uppercase tracking-widest">
                  YouTube
                </span>
              </Link>
              <Link
                href="https://discord.gg/9KrBNvBH7a"
                target="_blank"
                aria-label="Bloodline Ranks on Discord"
                className="group flex items-center gap-2 text-muted-foreground transition-colors hover:text-parchment"
              >
                <SiDiscord className="h-5 w-5 transition-transform group-hover:scale-110" />
                <span className="font-display text-xs uppercase tracking-widest">
                  Discord
                </span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
