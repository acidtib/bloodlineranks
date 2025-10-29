import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calculator, Sparkles, TrendingUp, Globe } from "lucide-react"
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
              <span className="text-muted-foreground">Tools for Hunt: Showdown players & streamers</span>
            </div>
            <h1 className="mb-6 mt-8 text-balance text-5xl font-bold tracking-tight md:text-7xl">Bloodline Ranks</h1>
            <p className="mb-8 text-pretty text-xl text-muted-foreground md:text-2xl">
              We make tools and community highlights for Hunt: Showdown. Get your aim right and help viewers find your stream.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="w-full sm:w-auto" asChild>
                <Link href="https://discord.gg/9KrBNvBH7a" target="_blank">Join the Discord</Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent" asChild>
                <Link href="https://www.youtube.com/@bloodlineranks" target="_blank">Visit YouTube</Link>
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
              We make simple, useful stuff for Hunt players and creators. If it helps you win fights or get more eyes on your stream, we build it.
            </p>
          </div>

          <Card className="border-2">
            <CardContent className="p-8 md:p-12">
              <p className="mb-8 text-pretty text-lg leading-relaxed text-foreground">
                We started in the Hunt community and focus on things that help in matches and on stream. That means aim tuning that feels right in a fight, straightforward event tools, and setup that takes minutes.
              </p>
              <p className="text-pretty text-lg leading-relaxed text-foreground">
                We test in real matches and build with creator feedback. If something’s clunky, we fix it or drop it. Tell us what you need, we’ll ship it, and we’ll help more viewers find you.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Tools Section */}
      <section className="border-y bg-muted/30 py-20 md:py-28">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight md:text-5xl">Our Tools</h2>
          <p className="text-pretty text-lg text-muted-foreground">Handy tools for Hunt.</p>
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
                Weekly highlights, spotlights, and guides that help Hunt creators get discovered.
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
                Discord bots for Hunt community events. Track stats and progress in real time.
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
                Set your Hunt sensitivity across scopes and weapons, quick, accurate, done.
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
            <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight md:text-5xl">Join the Bloodline</h2>
            <p className="mb-8 text-pretty text-lg text-muted-foreground md:text-xl">
              Hop in our Discord to talk Hunt, give feedback, and get featured.
            </p>
            <Button size="lg" asChild>
              <Link href="https://discord.gg/9KrBNvBH7a" target="_blank">Join the Discord Server</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Community Websites Section */}
      <section className="border-t bg-muted/20 py-20 md:py-28">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight md:text-5xl">Community Websites</h2>
          <p className="text-pretty text-lg text-muted-foreground">Sites we've built for creators in the Hunt community.</p>
        </div>
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          {/* Agent3540 Website */}
          <Card className="group overflow-hidden border-2 transition-all hover:border-primary hover:shadow-xl">
            <CardContent className="p-8">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                <Globe className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mb-3 text-2xl font-bold">Agent3540</h3>
              <p className="mb-6 text-pretty leading-relaxed text-muted-foreground">
                Streamer website with schedule, highlights, and social integrations for The Agency.
              </p>
              <Button className="w-full" asChild>
                <Link href="https://agent3540.com/" target="_blank">Visit Website</Link>
              </Button>
            </CardContent>
          </Card>
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
