"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useWallet as useSolanaWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, Connection, PublicKey } from "@solana/web3.js"
import { useToast } from "@/components/ui/use-toast"
import { BettingClient } from "@/lib/betting-client"
import { getSolanaEndpoint } from "@/lib/solana-wallet"

interface WalletContextType {
  isConnected: boolean
  publicKey: string | null
  balance: {
    usdc: string
    sol: string
  }
  connect: () => Promise<void>
  disconnect: () => Promise<void>
  placeBet: (amount: number, matchId: string, selection: string, odds: number) => Promise<boolean>
  bettingClient: BettingClient | null
  requestAirdrop: () => Promise<void>
  isHydrated: boolean
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

// USDC token address on Solana (this is the devnet address, use the mainnet address for production)
const USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"

function WalletContextProvider({ children }: { children: ReactNode }) {
  const { publicKey, connected, disconnect: solanaDisconnect, wallet } = useSolanaWallet()
  const [balance, setBalance] = useState({
    usdc: "0.00",
    sol: "0.00",
  })
  const [bettingClient, setBettingClient] = useState<BettingClient | null>(null)
  const [isHydrated, setIsHydrated] = useState(false)
  const { toast } = useToast()

  // Handle hydration
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  // Initialize betting client when wallet connects and is ready
  useEffect(() => {
    if (
      connected &&
      wallet &&
      wallet.adapter &&
      typeof wallet.adapter === 'object' &&
      publicKey
    ) {
      try {
        const client = new BettingClient(wallet.adapter)
        setBettingClient(client)
      } catch (e) {
        console.error('Failed to initialize BettingClient:', e)
        setBettingClient(null)
      }
    } else {
      setBettingClient(null)
    }
  }, [connected, wallet, publicKey])

  // Fetch SOL balance
  useEffect(() => {
    if (!publicKey || !isHydrated) return

    const fetchSolBalance = async () => {
      try {
        const connection = new Connection(getSolanaEndpoint())
        const solBalance = await connection.getBalance(publicKey)
        setBalance((prev) => ({
          ...prev,
          sol: (solBalance / LAMPORTS_PER_SOL).toFixed(4),
        }))
      } catch (error) {
        console.error("Error fetching SOL balance:", error)
      }
    }

    // For demo purposes, we're also setting a mock USDC balance
    // In a real app, you would fetch the actual token balance
    const fetchUsdcBalance = async () => {
      // Mock USDC balance for demo
      // In a real app, you would use something like:
      // const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, { mint: new PublicKey(USDC_MINT) })
      setBalance((prev) => ({
        ...prev,
        usdc: "1,450.75", // Mock value
      }))
    }

    fetchSolBalance()
    fetchUsdcBalance()

    // Set up interval to refresh balances
    const intervalId = setInterval(() => {
      fetchSolBalance()
      fetchUsdcBalance()
    }, 30000) // Refresh every 30 seconds

    return () => clearInterval(intervalId)
  }, [publicKey, isHydrated])

  // Connect wallet - this is handled by the Solana wallet adapter
  const connect = async () => {
    // The actual connection is handled by the WalletMultiButton
    // This function is kept for API consistency
    if (!wallet) {
      toast({
        title: "Wallet Connection",
        description: "Please select a wallet to connect",
      })
      return
    }

    try {
      await wallet.adapter.connect()
      toast({
        title: "Wallet Connected",
        description: "Your wallet has been connected successfully.",
      })
    } catch (error) {
      console.error("Error connecting wallet:", error)
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Disconnect wallet
  const disconnect = async () => {
    try {
      await solanaDisconnect()
      setBalance({
        usdc: "0.00",
        sol: "0.00",
      })
      setBettingClient(null)
      toast({
        title: "Wallet Disconnected",
        description: "Your wallet has been disconnected.",
      })
    } catch (error) {
      console.error("Error disconnecting wallet:", error)
      toast({
        title: "Disconnection Failed",
        description: "Failed to disconnect wallet. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Request airdrop for testing
  const requestAirdrop = async () => {
    if (!bettingClient) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet first.",
        variant: "destructive",
      })
      return
    }

    try {
      toast({
        title: "Requesting Airdrop",
        description: "Requesting 1 SOL airdrop...",
      })

      const signature = await bettingClient.requestAirdrop(1)
      
      toast({
        title: "Airdrop Successful",
        description: `Received 1 SOL. Transaction: ${signature.slice(0, 8)}...`,
      })

      // Refresh balance
      const newBalance = await bettingClient.getBalance()
      setBalance((prev) => ({
        ...prev,
        sol: newBalance.toFixed(4),
      }))
    } catch (error) {
      console.error("Error requesting airdrop:", error)
      toast({
        title: "Airdrop Failed",
        description: "Failed to request airdrop. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Place a bet using the Solana program
  const placeBet = async (amount: number, matchId: string, selection: string, odds: number): Promise<boolean> => {
    if (!publicKey || !bettingClient) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet to place a bet.",
        variant: "destructive",
      })
      return false
    }

    try {
      // Convert selection to team number
      let team: number;
      switch (selection) {
        case 'team1':
          team = 0;
          break;
        case 'team2':
          team = 1;
          break;
        case 'draw':
          team = 2;
          break;
        default:
          throw new Error('Invalid selection');
      }

      toast({
        title: "Placing Bet",
        description: `Placing bet of ${amount} SOL on ${selection}...`,
      })

      // Convert amount to lamports
      const amountInLamports = amount * LAMPORTS_PER_SOL;
      
      // Place bet using the Solana program
      const signature = await bettingClient.placeBet(
        matchId,
        amountInLamports,
        team,
        Math.floor(odds * 1000) // Convert odds to integer (e.g., 1.95 -> 1950)
      )

      toast({
        title: "Bet Placed Successfully",
        description: `Bet placed! Transaction: ${signature.slice(0, 8)}...`,
      })

      // Update balance
      const newBalance = await bettingClient.getBalance()
      setBalance((prev) => ({
        ...prev,
        sol: newBalance.toFixed(4),
      }))

      return true
    } catch (error) {
      console.error("Error placing bet:", error)
      toast({
        title: "Bet Failed",
        description: error instanceof Error ? error.message : "Failed to place bet. Please try again.",
        variant: "destructive",
      })
      return false
    }
  }

  return (
    <WalletContext.Provider
      value={{
        isConnected: connected,
        publicKey: publicKey?.toString() || null,
        balance,
        connect,
        disconnect,
        placeBet,
        bettingClient,
        requestAirdrop,
        isHydrated,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export function WalletProvider({ children }: { children: ReactNode }) {
  return <WalletContextProvider>{children}</WalletContextProvider>
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}
