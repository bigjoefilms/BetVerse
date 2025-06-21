import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import ClientWalletProvider from "@/components/client-wallet-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Under_score - Decentralized Sports Betting",
  description: "The first decentralized fantasy sports betting platform with automated market making. Bet on your favorite teams with USDC and SOL.",
  keywords: ["sports betting", "decentralized", "solana", "blockchain", "cricket", "football", "basketball"],
  authors: [{ name: "Under_score Team" }],
  creator: "Under_score",
  publisher: "Under_score",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://underscore.bet"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://underscore.bet",
    title: "Under_score - Decentralized Sports Betting",
    description: "The first decentralized fantasy sports betting platform with automated market making.",
    siteName: "Under_score",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Under_score - Decentralized Sports Betting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Under_score - Decentralized Sports Betting",
    description: "The first decentralized fantasy sports betting platform with automated market making.",
    images: ["/og-image.png"],
    creator: "@underscore_bet",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ClientWalletProvider>
            {children}
            <Toaster />
          </ClientWalletProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
