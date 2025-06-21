"use client"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { useWallet } from "./wallet-provider"
import { Wallet } from "lucide-react"
import { useEffect, useState } from "react"

interface WalletConnectProps {
  onConnect?: () => void
}

export default function WalletConnect({ onConnect }: WalletConnectProps) {
  const { isConnected, connect } = useWallet()
  const [isMounted, setIsMounted] = useState(false)

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleConnect = async () => {
    await connect()
    if (onConnect) onConnect()
  }

  // Show a placeholder during SSR to prevent hydration mismatch
  if (!isMounted) {
    return (
      <div className="wallet-adapter-wrapper">
        <button className="wallet-adapter-button custom-wallet-button inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
          <Wallet className="mr-2 h-4 w-4" />
          Select Wallet
        </button>
      </div>
    )
  }

  return (
    <div className="wallet-adapter-wrapper">
      <WalletMultiButton
        className="wallet-adapter-button custom-wallet-button"
        startIcon={<Wallet className="mr-2 h-4 w-4" />}
      />
    </div>
  )
}
