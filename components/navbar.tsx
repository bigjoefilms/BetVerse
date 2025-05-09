"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Bell, Menu, X, WalletIcon } from "lucide-react"
import NotificationPanel from "./notification-panel"
import WalletConnect from "./wallet-connect"
import WalletBalanceDisplay from "./wallet-balance-display"
import { useWallet } from "./wallet-provider"
import { cn } from "@/lib/utils"
import ThemeToggle from "./theme-toggle"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { usePathname } from "next/navigation"
import { Sparkles } from "lucide-react"

export default function Navbar() {
  const { isConnected, publicKey } = useWallet()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleNotifications = () => setShowNotifications(!showNotifications)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <div className="bg-primary text-primary-foreground rounded-md p-1.5 mr-2 transition-transform duration-300 group-hover:scale-110">
                <WalletIcon className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold font-heading">BetVerse</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        isActive("/") && "bg-accent/50 text-accent-foreground",
                      )}
                    >
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/matches" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        isActive("/matches") && "bg-accent/50 text-accent-foreground",
                      )}
                    >
                      Matches
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(
                      isActive("/sports/cricket") ||
                        isActive("/sports/football") ||
                        (isActive("/sports/basketball") && "bg-accent/50 text-accent-foreground"),
                    )}
                  >
                    Sports
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-1 p-2">
                      <li>
                        <Link href="/sports/cricket" legacyBehavior passHref>
                          <NavigationMenuLink
                            className={cn(
                              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                              isActive("/sports/cricket") && "bg-accent text-accent-foreground",
                            )}
                          >
                            <div className="text-sm font-medium">Cricket (IPL)</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Bet on IPL matches
                            </p>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                      <li>
                        <Link href="/sports/football" legacyBehavior passHref>
                          <NavigationMenuLink
                            className={cn(
                              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                              isActive("/sports/football") && "bg-accent text-accent-foreground",
                            )}
                          >
                            <div className="text-sm font-medium">Football</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Bet on football matches
                            </p>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                      <li>
                        <Link href="/sports/basketball" legacyBehavior passHref>
                          <NavigationMenuLink
                            className={cn(
                              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                              isActive("/sports/basketball") && "bg-accent text-accent-foreground",
                            )}
                          >
                            <div className="text-sm font-medium">Basketball</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Bet on basketball games
                            </p>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/leaderboard" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        isActive("/leaderboard") && "bg-accent/50 text-accent-foreground",
                      )}
                    >
                      Leaderboard
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/how-it-works" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        isActive("/how-it-works") && "bg-accent/50 text-accent-foreground",
                      )}
                    >
                      How it Works
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/ai-assistant" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        isActive("/ai-assistant") && "bg-accent/50 text-accent-foreground",
                      )}
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      AI Assistant
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />

            {isConnected ? (
              <>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Button variant="ghost" size="icon" onClick={toggleNotifications} className="relative">
                      <Bell size={20} />
                      <span className="absolute top-0 right-0 h-2 w-2 bg-primary rounded-full"></span>
                    </Button>
                    {showNotifications && <NotificationPanel />}
                  </div>

                  <WalletBalanceDisplay />

                  <Link href="/profile">
                    <Avatar className="h-9 w-9 cursor-pointer hover:opacity-90 transition-opacity">
                      <AvatarImage src="/avatar.png" alt="User" />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {publicKey ? publicKey.toString().slice(0, 2).toUpperCase() : "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                </div>
              </>
            ) : (
              <WalletConnect />
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />

            {isConnected && (
              <div className="relative">
                <Button variant="ghost" size="icon" onClick={toggleNotifications} className="relative">
                  <Bell size={20} />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-primary rounded-full"></span>
                </Button>
              </div>
            )}

            <button onClick={toggleMenu} className="text-foreground focus:outline-none">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-border mt-2 animate-fade-in">
            <Link
              href="/"
              className={cn(
                "block py-2 transition-colors",
                isActive("/") ? "text-primary font-medium" : "text-foreground/80 hover:text-primary",
              )}
            >
              Home
            </Link>
            <Link
              href="/matches"
              className={cn(
                "block py-2 transition-colors",
                isActive("/matches") ? "text-primary font-medium" : "text-foreground/80 hover:text-primary",
              )}
            >
              Matches
            </Link>
            <div className="space-y-2">
              <div className="text-foreground font-medium py-2">Sports</div>
              <div className="pl-4 space-y-2">
                <Link
                  href="/sports/cricket"
                  className={cn(
                    "block py-1 transition-colors",
                    isActive("/sports/cricket") ? "text-primary font-medium" : "text-foreground/80 hover:text-primary",
                  )}
                >
                  Cricket (IPL)
                </Link>
                <Link
                  href="/sports/football"
                  className={cn(
                    "block py-1 transition-colors",
                    isActive("/sports/football") ? "text-primary font-medium" : "text-foreground/80 hover:text-primary",
                  )}
                >
                  Football
                </Link>
                <Link
                  href="/sports/basketball"
                  className={cn(
                    "block py-1 transition-colors",
                    isActive("/sports/basketball")
                      ? "text-primary font-medium"
                      : "text-foreground/80 hover:text-primary",
                  )}
                >
                  Basketball
                </Link>
              </div>
            </div>
            <Link
              href="/leaderboard"
              className={cn(
                "block py-2 transition-colors",
                isActive("/leaderboard") ? "text-primary font-medium" : "text-foreground/80 hover:text-primary",
              )}
            >
              Leaderboard
            </Link>
            <Link
              href="/how-it-works"
              className={cn(
                "block py-2 transition-colors",
                isActive("/how-it-works") ? "text-primary font-medium" : "text-foreground/80 hover:text-primary",
              )}
            >
              How it Works
            </Link>
            <Link
              href="/ai-assistant"
              className={cn(
                "block py-2 transition-colors",
                isActive("/ai-assistant") ? "text-primary font-medium" : "text-foreground/80 hover:text-primary",
              )}
            >
              <div className="flex items-center">
                <Sparkles className="h-4 w-4 mr-2" />
                AI Assistant
              </div>
            </Link>
            {!isConnected && (
              <div className="pt-4">
                <WalletConnect />
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
