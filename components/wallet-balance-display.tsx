"use client"

import { useWallet } from "./wallet-provider"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { Copy, ExternalLink, Wallet } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function WalletBalanceDisplay() {
  const { isConnected, publicKey, balance, disconnect, isHydrated } = useWallet()
  const { toast } = useToast()

  // Don't render until hydrated to prevent SSR/client mismatch
  if (!isHydrated || !isConnected || !publicKey) {
    return null
  }

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  const copyAddress = () => {
    navigator.clipboard.writeText(publicKey)
    toast({
      title: "Address Copied",
      description: "Wallet address copied to clipboard",
    })
  }

  const viewOnExplorer = () => {
    window.open(`https://explorer.solana.com/address/${publicKey}?cluster=devnet`, "_blank")
  }

  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center space-x-2 h-9 px-3 rounded-lg">
            <Wallet className="h-4 w-4 mr-1 text-primary" />
            <span className="font-medium">${balance.usdc}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="p-2">
            <div className="text-sm font-medium mb-1">Wallet Balance</div>
            <div className="grid grid-cols-2 gap-1">
              <div className="text-xs text-muted-foreground">USDC</div>
              <div className="text-xs text-right">${balance.usdc}</div>
              <div className="text-xs text-muted-foreground">SOL</div>
              <div className="text-xs text-right">{balance.sol} SOL</div>
            </div>
          </div>
          <DropdownMenuItem>
            <Link href="/add-funds" className="w-full flex items-center">
              <Wallet className="mr-2 h-4 w-4" /> Add Funds
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/withdraw" className="w-full">
              Withdraw
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={copyAddress}>
            <Copy className="mr-2 h-4 w-4" /> Copy Address
          </DropdownMenuItem>
          <DropdownMenuItem onClick={viewOnExplorer}>
            <ExternalLink className="mr-2 h-4 w-4" /> View on Explorer
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => disconnect()}>Disconnect</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
