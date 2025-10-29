import type React from "react"
import type { Metadata } from "next"
import Script from 'next/script'

import "./globals.css"

import { Geist, Geist_Mono, Source_Serif_4 } from 'next/font/google'

// Initialize fonts
const _geist = Geist({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _geistMono = Geist_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _sourceSerif_4 = Source_Serif_4({ subsets: ['latin'], weight: ["200","300","400","500","600","700","800","900"] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NODE_ENV === 'production' ? 'https://bloodlineranks.com' : 'http://localhost:3000'),
  title: "Bloodline Ranks – Tools for Hunt: Showdown Players & Streamers",
  description: "Tools for Hunt: Showdown players and streamers, sens calculator, event trackers, and weekly highlights that help viewers find your stream.",
  keywords: "bloodline ranks, Hunt Showdown, tools, streamers, players, sensitivity calculator, community highlights, Twitch, YouTube, Hunt CET, event tracker",
  openGraph: {
    images: [
      {
        url: "/og-image-min.png",
        width: 1200,
        height: 630,
        alt: "Bloodline Ranks – Tools for Hunt: Showdown Players & Streamers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image-min.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <Script defer
          src='https://hola.otakubestie.me/js/script.outbound-links.js'
          data-domain='bloodlineranks.com'
        />
        <Script
          id="plausible-init"
          dangerouslySetInnerHTML={{
            __html: `
              window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
              plausible.init()
            `,
          }}
          strategy="afterInteractive"
        />
      </head>
      <body className={`font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
