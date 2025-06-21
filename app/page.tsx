"use client"
import { useState } from "react";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ChevronRight,
  Shield,
  Zap,
  Trophy,
  Wallet,
  Users,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import AnimatedBackground from "@/components/animated-background";
import FadeInSection from "@/components/fade-in-section";
import BettingCard from "@/components/betting-card";
import {AIInsightsSection} from "@/components/ai-insights-section"

const leaderboardData = [
  {
    rank: 1,
    wallet: "0xA1B2...C3D4",
    avatar: "/avatars/avatar1.png",
    winRate: "92%",
    profit: "$12,340",
    bets: 120,
  },
  {
    rank: 2,
    wallet: "0xE5F6...G7H8",
    avatar: "/avatars/avatar2.png",
    winRate: "88%",
    profit: "$9,870",
    bets: 98,
  },
  {
    rank: 3,
    wallet: "0xI9J0...K1L2",
    avatar: "/avatars/avatar3.png",
    winRate: "85%",
    profit: "$7,560",
    bets: 87,
  },
  {
    rank: 4,
    wallet: "0xM3N4...O5P6",
    avatar: "/avatars/avatar4.png",
    winRate: "80%",
    profit: "$6,120",
    bets: 75,
  },
  {
    rank: 5,
    wallet: "0xQ7R8...S9T0",
    avatar: "/avatars/avatar5.png",
    winRate: "78%",
    profit: "$5,430",
    bets: 68,
  },
];

export default function Home() {
  const [isPlacingBet, setIsPlacingBet] = useState(false);

  const handlePlaceBet = async (
    matchId: string,
    amount: number,
    odds: number,
    team: "team1" | "team2" | "draw"
  ) => {
    setIsPlacingBet(true);
    try {
      // Placeholder for bet placement logic
      console.log(`Placing bet: ${amount} on ${team} with odds ${odds} for match ${matchId}`);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    } catch (error) {
      console.error("Error placing bet:", error);
    } finally {
      setIsPlacingBet(false);
    }
  };

  return (
    <AnimatedBackground variant="dots" className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />

        <Navbar />

        <div className="container mx-auto px-4 pt-20 pb-24 relative z-10">
          <FadeInSection>
            <div className="max-w-4xl mx-auto text-center mb-12">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm mb-6 animate-pulse-slow">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
                <span>The Future of Sports Betting is Here</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold tracking-tight font-heading mb-6">
                Decentralized Sports Betting on{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
                  Solana
                </span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                The first decentralized fantasy sports betting platform with
                automated market making. Bet on your favorite teams with USDC
                and SOL.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="text-lg px-8 glow-on-hover"
                  asChild
                >
                  <Link href="/matches">
                    Start Betting <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="text-lg" asChild>
                  <Link href="/how-it-works">How It Works</Link>
                </Button>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection delay={300}>
            <div className="relative mt-16 mx-auto max-w-5xl">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-400 rounded-2xl blur-xl opacity-20 animate-pulse-slow"></div>
              <div className="relative bg-card rounded-2xl p-6 shadow-xl border border-border overflow-hidden bet-card">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>

                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Zap className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium font-heading">
                        Featured Match
                      </h3>
                      <p className="text-sm text-muted-foreground">Live Now</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                    <span className="text-sm font-medium text-red-500">
                      LIVE
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                  <div className="text-center">
                    <div className="relative w-24 h-24 mx-auto mb-4 team-logo">
                      <div className="absolute inset-0 bg-blue-500/10 rounded-full"></div>
                      <div className="relative h-full w-full rounded-full bg-card border border-border flex items-center justify-center">
                        <Image
                          src="https://media-hosting.imagekit.io/74c4b80444da42e8/Board_of_Control_for_Cricket_in_India_Logo_(2024).svg?Expires=1841939589&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=uY5FGDDJG5EPp~foAYhNd-A21MuoY2K5AIC6s5Nchzacg6rHtDQhGt6nxHh6rTXyQwd5h8MHZJPiVX3WvsnRVF45w6mGk9uogeg918n-7CkvCgz9CgqU7PWKImB-WyLvU7Nx2xM8n-Ct2eqGKMHrBKZK9AfZgJEuzRm53xjnuztBoSFLB~lquabWPRrsXPPXUTni7t5fJIhRAoQMzKtrTGhrvAjMyxOvYfvbWmpS4wybE83RPF0~p3aNg4Rw4VowIJSYkfLc8FQK28QI4nMNBufuS4o6dpVGWkTtbg5Zsf9uxCEu3hPkjm7--hiAF1taqnG3FK440Phryk05wA5Vhw__"
                          alt=" Indian"
                          width={60}
                          height={60}
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <h4 className="font-medium font-heading text-lg"> India</h4>
                    <p className="text-sm text-muted-foreground">
                      Current Score: 142/3 (15.2)
                    </p>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <div className="text-2xl font-bold text-muted-foreground mb-2">
                      VS
                    </div>
                    <div className="px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
                      IPL 2023
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Match #48
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="relative w-24 h-24 mx-auto mb-4 team-logo">
                      <div className="absolute inset-0 bg-yellow-500/10 rounded-full"></div>
                      <div className="relative h-full w-full rounded-full bg-card border border-border flex items-center justify-center">
                        <Image
                          src="https://media-hosting.imagekit.io/dbecdefbdee642d8/Cricket_Australia.png?Expires=1841939641&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=uPCW8E8sk8kL8F9Kqj1-0CUEQ94ua1MX9ga9ZYtEJK7SlE96eayzzzEWE5SlcYoEyCTR~nu-WAXdIlSxGRrZjcrd~x7vRR9UUNpgtho-dpFwIV3SrjP9xT2931ab7mdsC7AtYbf7zWL8HjzCsL8HAPwPHopFBdd47xAP6pl5KUfRACcjlFTfw~Qm-t-oaa2m-mVxtNjRLm-xNAUuuxsSbBsRMD5SuW42vNcQ5eZqvlz61ExlfJiamug~ulbkfKNCuAUxFCHdzYq--AnKYsUwCTBA7aNsbUIYBExY~xjbeOV19XY-hQt75RdkzDlu5sucYTOwkotWlgQu-AexYhzaKw__"
                          alt="Chennai Super Kings"
                          width={60}
                          height={60}
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <h4 className="font-medium font-heading text-lg">
                      Australia
                    </h4>
                    <p className="text-sm text-muted-foreground">Target: 186</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <Button
                    variant="outline"
                    className="flex flex-col items-center justify-center h-24 hover:bg-blue-500/5 hover:border-blue-500/50"
                    asChild
                  >
                    <Link href="/matches/CR1001">
                      <span className="text-sm text-muted-foreground">
                        Back
                      </span>
                      <span className="text-2xl font-bold text-blue-500">
                        3.95
                      </span>
                      <span className="text-xs text-muted-foreground">
                        India
                      </span>
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex flex-col items-center justify-center h-24 hover:bg-primary/5 hover:border-primary/50"
                    asChild
                  >
                    <Link href="/matches/CR1001">
                      <span className="text-sm text-muted-foreground">
                        Draw
                      </span>
                      <span className="text-2xl font-bold text-primary">
                        0.10
                      </span>
                      <span className="text-xs text-muted-foreground">X</span>
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex flex-col items-center justify-center h-24 hover:bg-yellow-500/5 hover:border-yellow-500/50"
                    asChild
                  >
                    <Link href="/matches/CR1001">
                      <span className="text-sm text-muted-foreground">
                        Back
                      </span>
                      <span className="text-2xl font-bold text-yellow-500">
                        2.24
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Australia
                      </span>
                    </Link>
                  </Button>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Zap className="h-4 w-4 text-primary mr-2" />
                    <span className="text-muted-foreground">
                      Liquidity:{" "}
                      <span className="font-medium text-foreground">
                        $24,560
                      </span>
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-primary"
                    asChild
                  >
                    <Link href="/matches/CR1001">
                      View Match Details{" "}
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection delay={600}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto">
              <div className="bg-card rounded-lg p-4 border border-border hover:border-primary/50 transition-colors">
                <div className="flex flex-col items-center text-center">
                  <div className="text-3xl font-bold gradient-text font-heading">
                    $2.5M+
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Total Volume
                  </span>
                </div>
              </div>
              <div className="bg-card rounded-lg p-4 border border-border hover:border-primary/50 transition-colors">
                <div className="flex flex-col items-center text-center">
                  <div className="text-3xl font-bold gradient-text font-heading">
                    12K+
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Active Users
                  </span>
                </div>
              </div>
              <div className="bg-card rounded-lg p-4 border border-border hover:border-primary/50 transition-colors">
                <div className="flex flex-col items-center text-center">
                  <div className="text-3xl font-bold gradient-text font-heading">
                    99%
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Payout Rate
                  </span>
                </div>
              </div>
              <div className="bg-card rounded-lg p-4 border border-border hover:border-primary/50 transition-colors">
                <div className="flex flex-col items-center text-center">
                  <div className="text-3xl font-bold gradient-text font-heading">
                    0.1%
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Platform Fee
                  </span>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>

     

      {/* How It Works Section */}
      <div className="container mx-auto px-4 py-24">
        <FadeInSection>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 font-heading">
                How Under_score Works
              </h2>
              <p className="text-xl text-muted-foreground">
                Our decentralized betting platform makes sports betting simple,
                secure, and rewarding.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="relative overflow-hidden bet-card">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <CardContent className="pt-8 pb-6 px-6">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <Wallet className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 font-heading">
                    Connect Wallet
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Link your Solana wallet to access the platform and manage
                    your funds securely.
                  </p>
                  <div className="flex items-center text-sm text-primary">
                    <span className="mr-1">Supported wallets</span>
                    <div className="flex -space-x-2">
                      <div className="h-6 w-6 rounded-full bg-background border border-border flex items-center justify-center">
                        <Image
                          src="/wallet-logos/phantom.png"
                          alt="Phantom"
                          width={16}
                          height={16}
                        />
                      </div>
                      <div className="h-6 w-6 rounded-full bg-background border border-border flex items-center justify-center">
                        <Image
                          src="/wallet-logos/solflare.png"
                          alt="Solflare"
                          width={16}
                          height={16}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden bet-card">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <CardContent className="pt-8 pb-6 px-6">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 font-heading">
                    Place Your Bets
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Choose from a wide range of sports events and bet types with
                    competitive odds.
                  </p>
                  <div className="flex items-center text-sm text-primary">
                    <span className="mr-1">Supported sports</span>
                    <div className="flex -space-x-2">
                      <div className="h-6 w-6 rounded-full bg-background border border-border flex items-center justify-center">
                        <span className="text-xs">🏏</span>
                      </div>
                      <div className="h-6 w-6 rounded-full bg-background border border-border flex items-center justify-center">
                        <span className="text-xs">⚽</span>
                      </div>
                      <div className="h-6 w-6 rounded-full bg-background border border-border flex items-center justify-center">
                        <span className="text-xs">🏀</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden bet-card">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <CardContent className="pt-8 pb-6 px-6">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <Trophy className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 font-heading">
                    Collect Winnings
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Winnings are automatically sent to your wallet when your
                    bets succeed.
                  </p>
                  <div className="flex items-center text-sm text-primary">
                    <span className="mr-1">Supported tokens</span>
                    <div className="flex -space-x-2">
                      <div className="h-6 w-6 rounded-full bg-background border border-border flex items-center justify-center">
                        <Image
                          src="/token-logos/usdc.png"
                          alt="USDC"
                          width={16}
                          height={16}
                        />
                      </div>
                      <div className="h-6 w-6 rounded-full bg-background border border-border flex items-center justify-center">
                        <Image
                          src="/token-logos/sol.png"
                          alt="SOL"
                          width={16}
                          height={16}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-16 text-center">
              <Button size="lg" className="glow-on-hover" asChild>
                <Link href="/how-it-works">
                  Learn More <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </FadeInSection>
      </div>

      {/* Live Matches Section */}
      <div className="bg-accent/10 py-24">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                <div>
                  <h2 className="text-3xl font-bold mb-2 font-heading">
                    Live Matches
                  </h2>
                  <p className="text-muted-foreground">
                    Bet on matches happening right now
                  </p>
                </div>
                <Link
                  href="/matches"
                  className="text-primary hover:underline flex items-center mt-4 md:mt-0"
                >
                  View All Matches <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>

              <Tabs defaultValue="cricket" className="w-full">
                <TabsList className="mb-8 w-full justify-start">
                  <TabsTrigger value="cricket" className="rounded-full">
                    Cricket (IPL)
                  </TabsTrigger>
                  <TabsTrigger value="football" className="rounded-full">
                    Football
                  </TabsTrigger>
                  <TabsTrigger value="basketball" className="rounded-full">
                    Basketball
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="cricket" className="space-y-6">
                  <BettingCard
                    id="CR1001"
                    team1="Mumbai Indians"
                    team1Logo="https://media-hosting.imagekit.io/6738eff126264b0a/screenshot_1747368124434.png?Expires=1841976127&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=xaJcY~IlZHs3yYAOyEh1peLGPBeFP0a0VartTwgHD2j6iKOWHAIRM6DnUcikVUQm4D7NLB45ER5oUqV3o9xLUt1tsujmmzJbmwpQmfszZa-C7FoOvONegUmfTRdtOb-0z-EwZraUhmtjdVC34FRwUw5YSqZ74prTCJoHh8oTEygHWNyE5ILMaPDXN77G2hGq-d9sdDbJWpwtJ66IxzqutuqZKlwXInziTxQEN38Z5kwgwNq2r2z~kepLA8yHR-mnKBgtmwRlBtmjpCVvpIjJLJrlWGCxNOkGvbw~ZQJ4TFpYjjivrV6Ka098KVN1ZNgQMJlHiV41F0Scww~N2~wuUA__"
                    team1Color="blue"
                    team2="Chennai Super Kings"
                    team2Logo="https://media-hosting.imagekit.io/03826d25f4c74b7d/screenshot_1747368081097.png?Expires=1841976084&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=dQZV8lrz4sE8WrvirUmvGpxhbjvOIkQ0wRT13BysjoUdiUbSqnlzUb~y9UaekJYe3H4ibuE5TB7wPz2gjLuPXuHdnoQA4SUzYT~PkoVPIOdK1d21FnNMo8d1r47zEeMNEiEmRjhCAkzDuHKwB4892IsVPF7x~l6EYUyuwcTojpdak8mYJCKqZoLuvgeWUXTrUJSxNgTrIJGsqZcceafH5AT4bM510DNPr7yNlazqe4fSe3A5rY4tmi2KfXA~TQ52GsVFZ5jz5ZlurYPgYAvhAfEs4lTTomRvFFT1ZtO8K5IlvWLXeoCSkD1JitQFLHHG8sFU2606aqeY9jdiIm-5AQ__"
                    team2Color="yellow"
                    team1Odds="1.95"
                    team2Odds="1.85"
                    drawOdds="3.50"
                    timeLeft="32:15"
                    liquidity="$24,560"
                    isLive={true}
                    team1Score="142/3 (15.2)"
                    team2Score="Target: 186"
                    venue="Wankhede Stadium"
                    participants={156}
                    onPlaceBet={handlePlaceBet}
                    isPlacingBet={isPlacingBet}
                  />

                  <BettingCard
                    id="CR1002"
                    team1="Royal Challengers Bangalore"
                    team1Logo="https://media-hosting.imagekit.io/c4a7bba832f34a56/screenshot_1747368167104.png?Expires=1841976170&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=pQq45~aYDwagu2TfBm1wwDBGSXuvjsZoe6o6~rZJYUsrEacaNWVVZvkh7YeDiIA3qugSWi4TBinen6KSSdOYMhtAsGCeTs7H8yMb7zn1y9BJfi1Xq-2swFsK-KsXoRKJbUQVB6VrBYAL~MONiP9kpItJRwgqE0BSkW2a2jCnCp8iIZZqEZZoqvSaEwS4nV9aNagGlAzcPlSwBhVDlDHGUke4K1Qd~HGV8P9GGMHFNmrkUh6~IO1WY4eonNPhLEcvLL7Azkg5GR0ZaALo1htV6lF82v7BM0pF3DVlIF2EhKp8ipAVW-ADUFvPUjJZo0lsBhfbdF1P~tK49KSCn29trQ__"
                    team1Color="red"
                    team2="Kolkata Knight Riders"
                    team2Logo="https://media-hosting.imagekit.io/a838787683514c69/screenshot_1747368176857.png?Expires=1841976179&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=EdkCjMM21IXOU2yfmdiBnIiI565nqDbo8QzngFQrxxpL2MEBIP0Bt0sUP1hypJdHFG80ANDIfadgMtIcJQbcv72lX0a2EO5yUS8FtmhLZvNqoBSrzQgTO8DJteA5h4Whkjs5kIdTTnt3LLJgW4p~TmJJ~wiyPU22jLCrump2AQ8kYT2SS0sNvJVyvW6bRxFX82Yyf9T4wMwZ~Rjm~92PArdiuoFVl2DOdr7LmMieR63wwg4Y2flD~H18z36KUOFaaX1H~2Vho6pgrWg4-fHdMYUlUJ5wYeG~W-9Sg-Ug2mcgbOEHI1KOLP-Jn3LSzdFPzlRQC0EaKwmOzOlf2sHdeg__"
                    team2Color="purple"
                    team1Odds="2.10"
                    team2Odds="1.75"
                    drawOdds="3.80"
                    timeLeft="12:45"
                    liquidity="$18,320"
                    isLive={true}
                    team1Score="95/2 (10.3)"
                    team2Score="Target: 175"
                    venue="M. Chinnaswamy Stadium"
                    participants={89}
                    onPlaceBet={handlePlaceBet}
                    isPlacingBet={isPlacingBet}
                  />
                </TabsContent>

                <TabsContent value="football" className="space-y-6">
                  <BettingCard
                    id="FB1001"
                    team1="Manchester United"
                    team1Logo="/team-logos/man-utd.png"
                    team1Color="red"
                    team2="Liverpool"
                    team2Logo="/team-logos/liverpool.png"
                    team2Color="red"
                    team1Odds="2.25"
                    team2Odds="1.65"
                    drawOdds="3.20"
                    timeLeft="45:00"
                    liquidity="$32,450"
                    isLive={true}
                    team1Score="1"
                    team2Score="2"
                    venue="Old Trafford"
                    tournament="Premier League"
                    participants={234}
                    onPlaceBet={handlePlaceBet}
                    isPlacingBet={isPlacingBet}
                  />
                </TabsContent>

                <TabsContent value="basketball" className="space-y-6">
                  <BettingCard
                    id="BB1001"
                    team1="LA Lakers"
                    team1Logo="/team-logos/lakers.png"
                    team1Color="purple"
                    team2="Golden State Warriors"
                    team2Logo="/team-logos/warriors.png"
                    team2Color="blue"
                    team1Odds="1.85"
                    team2Odds="1.95"
                    drawOdds="15.00"
                    timeLeft="08:22"
                    liquidity="$28,950"
                    isLive={true}
                    team1Score="87"
                    team2Score="92"
                    venue="Staples Center"
                    tournament="NBA"
                    participants={167}
                    onPlaceBet={handlePlaceBet}
                    isPlacingBet={isPlacingBet}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </FadeInSection>
        </div>
      </div>

      {/* Leaderboard Section */}
      <div className="container mx-auto px-4 py-24">
        <FadeInSection>
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl font-bold mb-2 font-heading">
                  Top Bettors
                </h2>
                <p className="text-muted-foreground">
                  The most successful bettors on our platform
                </p>
              </div>
              <Link
                href="/leaderboard"
                className="text-primary hover:underline flex items-center mt-4 md:mt-0"
              >
                View Full Leaderboard <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <Card className="bet-card">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-4 font-medium text-muted-foreground">
                          Rank
                        </th>
                        <th className="text-left p-4 font-medium text-muted-foreground">
                          Wallet
                        </th>
                        <th className="text-left p-4 font-medium text-muted-foreground">
                          Win Rate
                        </th>
                        <th className="text-left p-4 font-medium text-muted-foreground">
                          Total Profit
                        </th>
                        <th className="text-left p-4 font-medium text-muted-foreground">
                          Bets
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaderboardData.map((player) => (
                        <tr
                          key={player.rank}
                          className="border-b border-border hover:bg-accent/10 transition-colors"
                        >
                          <td className="p-4">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-medium">
                              {player.rank}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center space-x-3">
                              <div className="h-10 w-10 rounded-full bg-accent overflow-hidden">
                                <Image
                                  src={player.avatar}
                                  alt={`Player ${player.rank}`}
                                  width={40}
                                  height={40}
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <div className="font-medium">
                                  {player.wallet}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  Joined Apr 2023
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              <div className="w-16 h-2 rounded-full bg-muted overflow-hidden">
                                <div
                                  className="h-full bg-primary rounded-full"
                                  style={{ width: player.winRate }}
                                />
                              </div>
                              <span className="font-medium">
                                {player.winRate}
                              </span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="font-medium text-green-500">
                              {player.profit}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="font-medium">{player.bets}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </FadeInSection>
      </div>

      {/* Features Section */}
      <div className="bg-card border-y border-border py-24">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4 font-heading">
                  Why Choose Under_score
                </h2>
                <p className="text-xl text-muted-foreground">
                  Our platform offers unique advantages over traditional betting
                  sites
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 font-heading">
                    Fully Decentralized
                  </h3>
                  <p className="text-muted-foreground">
                    All bets are executed through smart contracts on the Solana
                    blockchain, ensuring transparency and security.
                  </p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <Zap className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 font-heading">
                    Low Fees
                  </h3>
                  <p className="text-muted-foreground">
                    Our platform charges just 0.1% on winning bets,
                    significantly lower than traditional betting sites.
                  </p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 font-heading">
                    Community Owned
                  </h3>
                  <p className="text-muted-foreground">
                    Under_score is governed by its community through a DAO,
                    ensuring the platform evolves to meet user needs.
                  </p>
                </div>
              </div>

              <div className="mt-16 text-center">
                <Button
                  size="lg"
                  variant="outline"
                  className="glow-on-hover"
                  asChild
                >
                  <Link href="/features">
                    Explore All Features <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-24">
        <FadeInSection>
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-400/10"></div>
              <div className="absolute inset-0 dot-grid opacity-10"></div>

              <div className="relative p-12 text-center">
                <h2 className="text-3xl font-bold mb-4 font-heading">
                  Ready to Start Betting?
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                  Join thousands of users already betting on Under_score.
                  Connect your wallet and start winning today.
                </p>
                <Button size="lg" className="text-lg glow-on-hover" asChild>
                  <Link href="/matches">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>

      <Footer />
    </AnimatedBackground>
  );
}

// Leaderboard Row Component
function LeaderboardRow({ 
  rank, 
  username, 
  avatar, 
  winRate, 
  profit, 
  bets 
}: {
  rank: number;
  username: string;
  avatar: string;
  winRate: number;
  profit: number;
  bets: number;
}) {
  return (
    <tr className="border-b border-border hover:bg-accent/10 transition-colors">
      <td className="p-4">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-medium">
          {rank}
        </div>
      </td>
      <td className="p-4">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-accent overflow-hidden">
            <Image
              src={avatar || `/placeholder.svg?height=40&width=40&query=avatar`}
              alt={username}
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <div>
            <div className="font-medium">{username}</div>
            <div className="text-xs text-muted-foreground">Joined Apr 2023</div>
          </div>
        </div>
      </td>
      <td className="p-4">
        <div className="flex items-center space-x-2">
          <div className="w-16 h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-primary rounded-full"
              style={{ width: `${winRate}%` }}
            ></div>
          </div>
          <span className="font-medium">{winRate}%</span>
        </div>
      </td>
      <td className="p-4">
        <div className="font-medium text-green-500">
          +${profit.toLocaleString()}
        </div>
      </td>
      <td className="p-4">
        <div className="font-medium">{bets}</div>
      </td>
    </tr>
  );
}
