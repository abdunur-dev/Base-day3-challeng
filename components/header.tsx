"use client"

import { Button } from "@/components/ui/button"
import { Wallet, Zap, Menu, LogOut } from "lucide-react"
import { useAccount, useDisconnect } from "wagmi"
import { useState } from "react"
import { WalletSelectorModal } from "./wallet-selector-modal"

export function Header() {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [walletSelectorOpen, setWalletSelectorOpen] = useState(false)

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const handleWalletAction = () => {
    if (isConnected) {
      disconnect()
    } else {
      setWalletSelectorOpen(true)
    }
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-base font-bold sm:text-lg">GaslessRewards</span>
          </div>

          <nav className="hidden md:flex items-center gap-4 lg:gap-6">
            <a
              href="#rewards"
              className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors lg:text-sm"
            >
              Rewards
            </a>
            <a
              href="#features"
              className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors lg:text-sm"
            >
              Features
            </a>
            <a
              href="#about"
              className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors lg:text-sm"
            >
              About
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <Button
              onClick={handleWalletAction}
              className="gap-2 text-xs sm:text-sm h-9"
              variant={isConnected ? "secondary" : "default"}
              size="sm"
            >
              {isConnected ? (
                <>
                  <Wallet className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{formatAddress(address!)}</span>
                  <span className="sm:hidden">Connected</span>
                  <LogOut className="h-3.5 w-3.5 ml-1" />
                </>
              ) : (
                <>
                  <Wallet className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Connect Wallet</span>
                  <span className="sm:hidden">Connect</span>
                </>
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="md:hidden h-9 w-9 p-0"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur">
            <nav className="container flex flex-col gap-2 py-4 px-4">
              <a
                href="#rewards"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Rewards
              </a>
              <a
                href="#features"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#about"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </a>
            </nav>
          </div>
        )}
      </header>

      <WalletSelectorModal open={walletSelectorOpen} onOpenChange={setWalletSelectorOpen} />
    </>
  )
}
