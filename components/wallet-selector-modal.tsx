"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useConnect } from "wagmi"
import { Wallet, Loader2, Zap } from "lucide-react"

interface WalletSelectorModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function WalletSelectorModal({ open, onOpenChange }: WalletSelectorModalProps) {
  const { connectors, connect, isPending } = useConnect()

  const getWalletIcon = (connectorName: string) => {
    const name = connectorName.toLowerCase()
    if (name.includes("metamask")) return "🦊"
    if (name.includes("coinbase")) return "💙"
    if (name.includes("walletconnect")) return "🔗"
    if (name.includes("injected")) return "💼"
    return "👛"
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Connect Your Wallet
          </DialogTitle>
          <DialogDescription>Select your wallet to connect and start claiming gas-free rewards</DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-4">
          <div className="flex items-center gap-2 px-3 py-2 bg-primary/5 rounded-lg">
            <Zap className="h-4 w-4 text-primary" />
            <p className="text-xs font-medium text-muted-foreground">
              Step 1: Connect wallet • Step 2: Click claim • Step 3: Confirm in wallet
            </p>
          </div>

          <div className="grid gap-3">
            {connectors.map((connector) => (
              <Button
                key={connector.uid}
                onClick={() => {
                  connect({ connector })
                  onOpenChange(false)
                }}
                disabled={isPending}
                variant="outline"
                className="h-12 justify-start gap-3 text-base font-medium hover:bg-primary/5 transition-colors"
              >
                {isPending ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <span className="text-xl">{getWalletIcon(connector.name)}</span>
                )}
                <span className="flex-1 text-left">{connector.name}</span>
                {isPending && <span className="text-xs text-muted-foreground">Connecting...</span>}
              </Button>
            ))}
          </div>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          Don't have a wallet?{" "}
          <a
            href="https://metamask.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline font-medium"
          >
            Get MetaMask
          </a>
        </p>
      </DialogContent>
    </Dialog>
  )
}
