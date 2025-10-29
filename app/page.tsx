import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calculator, Sparkles, TrendingUp } from "lucide-react"
import { SiTwitch, SiYoutube } from "react-icons/si"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(white,transparent_85%)]" />
        <div className="container relative mx-auto px-4 py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-2 text-sm backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">Precision tools for competitive hunters</span>
            </div>
            <h1 className="mb-6 text-balance text-5xl font-bold tracking-tight md:text-7xl">Bloodline Ranks</h1>
            <p className="mb-8 text-pretty text-xl text-muted-foreground md:text-2xl">
              Advanced hunting tools and analytics designed to elevate your performance and dominate the Bayou.
            </p>
            <div className="invisible flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="w-full sm:w-auto" asChild>
                <Link href="https://huntsense.bloodlineranks.com/">Try Sensitivity Calculator</Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-4 py-20 md:py-28">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight md:text-5xl">Our Mission</h2>
            <p className="text-pretty text-lg text-muted-foreground md:text-xl">
              We build cutting edge tools that give hunters the competitive edge they need to succeed.
            </p>
          </div>

          <Card className="border-2">
            <CardContent className="p-8 md:p-12">
              <p className="mb-8 text-pretty text-lg leading-relaxed text-foreground">
                Founded by passionate gamers and developers, Bloodline Ranks emerged from a simple belief: success in
                the Bayou isn't just about reflexes, it's about precision, strategy, and having the right tools
                at your disposal.
              </p>
              <p className="text-pretty text-lg leading-relaxed text-foreground">
                We combine coding, real world testing, and community feedback to create tools that make a difference in your hunts.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Tools Section */}
      <section className="border-y bg-muted/30 py-20 md:py-28">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight md:text-5xl">Our Tools</h2>
          <p className="text-pretty text-lg text-muted-foreground">Professional grade utilities for serious hunters.</p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          {/* Community YouTube Channel */}
          <Card className="group overflow-hidden border-2 transition-all hover:border-primary hover:shadow-xl">
            <CardContent className="p-8">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                <SiYoutube className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mb-3 text-2xl font-bold">Bloodline Ranks YouTube Channel</h3>
              <p className="mb-6 text-pretty leading-relaxed text-muted-foreground">
                Get featured to drive more viewers to your Twitch. Clips, guides, and spotlights.
              </p>
              <Button className="w-full" asChild>
                <Link href="https://www.youtube.com/@bloodlineranks" target="_blank">Visit Channel</Link>
              </Button>
            </CardContent>
          </Card>
          
          {/* HuntCET */}
          <Card className="group overflow-hidden border-2 transition-all hover:border-primary hover:shadow-xl">
            <CardContent className="p-8">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                <TrendingUp className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mb-3 text-2xl font-bold">Hunt Community Event Tracker</h3>
              <p className="mb-6 text-pretty leading-relaxed text-muted-foreground">
                Discord bots for Hunt: Showdown community events. Track stats and progress in real time.
              </p>
              <Button className="w-full" asChild>
                <Link href="https://huntcet.com/" target="_blank">Visit HuntCET</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Sensitivity Calculator */}
          <Card className="group overflow-hidden border-2 transition-all hover:border-primary hover:shadow-xl">
            <CardContent className="p-8">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                <Calculator className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mb-3 text-2xl font-bold">Sensitivity Calculator</h3>
              <p className="mb-6 text-pretty leading-relaxed text-muted-foreground">
                Achieve pixel perfect aim across all scopes and weapons with our sensitivity calibration tool.
              </p>
              <Button className="w-full" asChild>
                <Link href="https://huntsense.bloodlineranks.com/" target="_blank">Launch Calculator</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Coming Soon */}
          <Card className="overflow-hidden border-2 border-dashed">
            <CardContent className="p-8">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-muted">
                <Sparkles className="h-7 w-7 text-muted-foreground" />
              </div>
              <h3 className="mb-3 text-2xl font-bold">More Tools Coming Soon</h3>
              <p className="mb-6 text-pretty leading-relaxed text-muted-foreground">
                We're constantly developing new tools and features to help you level up your game. Stay tuned for
                exciting updates and innovations.
              </p>
              <Button variant="outline" className="w-full bg-transparent" disabled>
                In Development
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight md:text-5xl">Ready to Level Up?</h2>
            <p className="mb-8 text-pretty text-lg text-muted-foreground md:text-xl">
              Join a community of hunters using Bloodline Ranks tools to improve their gameplay and viewership.
            </p>
            <Button size="lg" asChild>
              <Link href="https://discord.gg/9KrBNvBH7a" target="_blank">Join the Discord Server</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Bloodline Ranks.
            </p>
            <div className="flex gap-6">
            <Link
              href="https://www.twitch.tv/acidtib"
              target="_blank"
              aria-label="Bloodline Ranks on Twitch"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <SiTwitch className="h-5 w-5" />
              <span>Twitch</span>
            </Link>
            <Link
              href="https://www.youtube.com/@bloodlineranks"
              target="_blank"
              aria-label="Bloodline Ranks on YouTube"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <SiYoutube className="h-5 w-5" />
              <span>YouTube</span>
            </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
