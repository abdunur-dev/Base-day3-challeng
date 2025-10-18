"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Gift, Coins, Trophy, Star, CheckCircle2, AlertCircle, Wallet, Zap, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { toast } from "sonner"
import { REWARD_DISTRIBUTOR_ABI } from "@/lib/contract-abi"
import { REWARD_DISTRIBUTOR_ADDRESS, REWARD_ID_MAP } from "@/lib/contract-config"
import { useClaimedRewards } from "@/hooks/use-claimed-rewards"

const rewards = [
  {
    id: 1,
    icon: Gift,
    title: "Welcome Bonus",
    description: "Claim your first reward just for joining",
    amount: "100 TOKENS",
    status: "available",
    color: "from-primary to-primary/60",
  },
  {
    id: 2,
    icon: Coins,
    title: "Daily Check-in",
    description: "Come back every day to earn more",
    amount: "50 TOKENS",
    status: "available",
    color: "from-secondary to-secondary/60",
  },
  {
    id: 3,
    icon: Trophy,
    title: "Achievement Unlock",
    description: "Complete 10 transactions to unlock",
    amount: "500 TOKENS",
    status: "locked",
    color: "from-chart-3 to-chart-3/60",
  },
  {
    id: 4,
    icon: Star,
    title: "Referral Bonus",
    description: "Invite friends and earn together",
    amount: "200 TOKENS",
    status: "available",
    color: "from-chart-4 to-chart-4/60",
  },
]

export function RewardsSection() {
  const [claiming, setClaiming] = useState<number | null>(null)
  const [errors, setErrors] = useState<Record<number, string>>({})
  const { address, isConnected } = useAccount()

  const {
    writeContract,
    data: hash,
    isPending,
    error: writeError,
  } = useWriteContract({
    mutation: {
      onError: (error) => {
        console.log("[v0] Write contract error:", error)
        if (claiming) {
          const errorMessage = error?.message || "Failed to send transaction"
          setErrors((prev) => ({ ...prev, [claiming]: errorMessage }))
          toast.error("Transaction failed", { description: errorMessage })
          setClaiming(null)
        }
      },
    },
  })

  const { isLoading: isConfirming, isSuccess, error: receiptError } = useWaitForTransactionReceipt({ hash })

  const { claimedMap, isLoading: isLoadingClaimed } = useClaimedRewards()

  useEffect(() => {
    if (isSuccess && claiming) {
      const reward = rewards.find((r) => r.id === claiming)
      toast.success("Reward claimed!", {
        description: `You've successfully claimed ${reward?.amount}. Transaction is gas-free!`,
      })
      setClaiming(null)
      setErrors((prev) => ({ ...prev, [claiming]: "" }))
    }
  }, [isSuccess, claiming])

  useEffect(() => {
    if (receiptError && claiming) {
      const errorMessage = receiptError?.message || "Transaction failed"
      setErrors((prev) => ({ ...prev, [claiming]: errorMessage }))
      toast.error("Transaction failed", { description: errorMessage })
      setClaiming(null)
    }
  }, [receiptError, claiming])

  const handleClaim = async (id: number) => {
    if (!isConnected) {
      toast.error("Connect your wallet first", {
        description: "Click the 'Connect Wallet' button in the header to get started",
      })
      return
    }

    if (!address) {
      toast.error("No wallet address found", {
        description: "Please reconnect your wallet",
      })
      return
    }

    if (REWARD_DISTRIBUTOR_ADDRESS === "0x0000000000000000000000000000000000000000") {
      toast.error("Contract not configured", {
        description: "Please set NEXT_PUBLIC_REWARD_DISTRIBUTOR_ADDRESS environment variable",
      })
      return
    }

    setClaiming(id)
    setErrors((prev) => ({ ...prev, [id]: "" }))

    try {
      const onChainId = REWARD_ID_MAP[id]
      console.log("[v0] Starting claim for reward:", id, "On-chain ID:", onChainId, "Address:", address)

      toast.loading("Waiting for wallet confirmation...", {
        description: "Check your wallet to approve the transaction",
      })

      writeContract(
        {
          address: REWARD_DISTRIBUTOR_ADDRESS as `0x${string}`,
          abi: REWARD_DISTRIBUTOR_ABI,
          functionName: "claim",
          args: [BigInt(onChainId)],
        },
        {
          onSuccess: (hash) => {
            console.log("[v0] Transaction sent:", hash)
            toast.loading("Confirming transaction...", {
              description: "Your transaction is being processed",
            })
          },
          onError: (error) => {
            console.log("[v0] Transaction error:", error)
            const errorMessage = error?.message || "Failed to send transaction"
            setErrors((prev) => ({ ...prev, [id]: errorMessage }))
            toast.error("Transaction failed", { description: errorMessage })
            setClaiming(null)
          },
        },
      )
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
      setErrors((prev) => ({ ...prev, [id]: errorMessage }))
      toast.error("Claim failed", { description: errorMessage })
      console.error("[v0] Error claiming reward:", error)
      setClaiming(null)
    }
  }

  return (
    <section id="rewards" className="py-12 sm:py-16 md:py-20">
      <div className="container px-4">
        <div className="mb-8 sm:mb-12 text-center">
          <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-balance">
            Available Rewards
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
            Claim your rewards instantly without worrying about gas fees. All transactions are sponsored by our
            paymaster.
          </p>
        </div>

        {!isConnected && (
          <div className="mb-8 p-4 sm:p-6 bg-primary/5 border border-primary/20 rounded-lg flex items-start gap-3">
            <Wallet className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-sm sm:text-base text-foreground">Connect your wallet to claim rewards</p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Click the "Connect Wallet" button in the header to get started. Your transactions will be gas-free!
              </p>
            </div>
          </div>
        )}

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
          {rewards.map((reward) => {
            const isClaimed = claimedMap[reward.id as keyof typeof claimedMap]
            const error = errors[reward.id]
            const isLoading = claiming === reward.id && (isPending || isConfirming)
            const isWaitingConfirmation = claiming === reward.id && isPending
            const isProcessing = claiming === reward.id && isConfirming

            return (
              <Card key={reward.id} className="relative overflow-hidden group hover:shadow-lg transition-shadow">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${reward.color} opacity-5 group-hover:opacity-10 transition-opacity`}
                />

                <CardHeader className="pb-3 sm:pb-4">
                  <div className="mb-2 sm:mb-3 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10">
                    <reward.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <CardTitle className="text-base sm:text-lg md:text-xl">{reward.title}</CardTitle>
                  <CardDescription className="text-xs sm:text-sm leading-relaxed">{reward.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg sm:text-xl md:text-2xl font-bold">{reward.amount}</span>
                    {isClaimed ? (
                      <Badge variant="secondary" className="bg-secondary/20 text-secondary-foreground text-xs">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Claimed
                      </Badge>
                    ) : reward.status === "available" ? (
                      <Badge variant="secondary" className="bg-secondary/20 text-secondary-foreground text-xs">
                        Available
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs">
                        Locked
                      </Badge>
                    )}
                  </div>

                  <Button
                    className="w-full text-xs sm:text-sm h-9 sm:h-10"
                    disabled={reward.status === "locked" || isLoading || isClaimed || !isConnected}
                    onClick={() => handleClaim(reward.id)}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        {isWaitingConfirmation ? "Waiting for wallet..." : "Confirming..."}
                      </>
                    ) : isClaimed ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 mr-1" />
                        Claimed
                      </>
                    ) : !isConnected ? (
                      <>
                        <Wallet className="h-4 w-4 mr-1" />
                        Connect Wallet
                      </>
                    ) : (
                      <>
                        <Zap className="h-4 w-4 mr-1" />
                        Claim Reward
                      </>
                    )}
                  </Button>

                  {error && (
                    <div className="flex items-start gap-2 p-2 bg-destructive/10 rounded-md">
                      <AlertCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                      <p className="text-[10px] sm:text-xs text-destructive">{error}</p>
                    </div>
                  )}

                  {reward.status === "available" && !isClaimed && !error && isConnected && !isLoading && (
                    <p className="text-[10px] sm:text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
                      <Zap className="h-3 w-3" /> Gas-free transaction
                    </p>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
