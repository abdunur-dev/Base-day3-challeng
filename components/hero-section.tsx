"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, ArrowRight } from "lucide-react"
import { useAccount } from "wagmi"

export function HeroSection() {
  const { isConnected } = useAccount()

  const handleStartClaiming = () => {
    if (isConnected) {
      document.getElementById("rewards")?.scrollIntoView({ behavior: "smooth" })
    } else {
      alert("Please connect your wallet first!")
    }
  }

  const handleLearnMore = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative overflow-hidden py-12 sm:py-16 md:py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

      <div className="container relative px-4">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-4 sm:mb-6 gap-1.5 px-3 py-1 sm:px-4 sm:py-1.5">
            <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            <span className="text-xs sm:text-sm font-medium">Zero Gas Fees</span>
          </Badge>

          <h1 className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
            Claim rewards without{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">paying gas</span>
          </h1>

          <p className="mb-6 sm:mb-8 md:mb-10 text-sm sm:text-base md:text-lg text-muted-foreground text-balance leading-relaxed max-w-2xl mx-auto">
            Experience seamless blockchain interactions with smart wallets and paymasters. We sponsor your transactions
            so you can focus on earning rewards.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button size="lg" className="gap-2 text-sm sm:text-base h-10 sm:h-11" onClick={handleStartClaiming}>
              Start Claiming
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-sm sm:text-base bg-transparent h-10 sm:h-11"
              onClick={handleLearnMore}
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
