import type React from "react"
import type { Metadata } from "next"
import Script from 'next/script'

import "./globals.css"

import localFont from 'next/font/local'
import { JetBrains_Mono } from 'next/font/google'

// Hunt: Showdown display font - Unfair Style 2
const unfairStyle = localFont({
  src: './fonts/Unfair Style2Clean.ttf',
  variable: '--font-unfair',
  display: 'swap',
})

// Hunt: Showdown body font - GT Sectra Fine
const gtSectraFine = localFont({
  src: [
    {
      path: './fonts/GT-Sectra-Fine-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/GT-Sectra-Fine-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/GT-Sectra-Fine-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-sectra',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NODE_ENV === 'production' ? 'https://bloodlineranks.com' : 'http://localhost:3000'),
  title: "Bloodline Ranks - Tools for Hunt: Showdown Players & Creators",
  description: "Bloodline Ranks builds practical tools for Hunt: Showdown players and content creators, including the Hunt Community Event Tracker, sensitivity calculator, and custom community websites.",
  keywords: "bloodline ranks, Hunt Showdown, tools, content creators, players, sensitivity calculator, hunt community event tracker, huntcet, community websites, twitch, youtube",
  openGraph: {
    title: "Bloodline Ranks - Tools for Hunt: Showdown Players & Creators",
    description: "Tools and resources for Hunt: Showdown players and creators: HuntCET, sensitivity calculators, and community website projects.",
    images: [
      {
        url: "/og-image-min.png",
        width: 1200,
        height: 630,
        alt: "Bloodline Ranks - Tools for Hunt: Showdown Players & Creators",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bloodline Ranks - Tools for Hunt: Showdown Players & Creators",
    description: "Discover community-built Hunt: Showdown tools like HuntCET, the sensitivity calculator, and custom creator websites.",
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
      <body className={`${unfairStyle.variable} ${gtSectraFine.variable} ${jetbrainsMono.variable} font-body antialiased`}>
        {children}
      </body>
    </html>
  )
}
