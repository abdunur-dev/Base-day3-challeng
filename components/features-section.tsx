import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, Shield, Zap, Sparkles, Lock, TrendingUp } from "lucide-react"

const features = [
  {
    icon: Wallet,
    title: "Smart Wallet Integration",
    description: "Connect with any smart wallet and enjoy seamless transactions without managing private keys.",
  },
  {
    icon: Zap,
    title: "Instant Claims",
    description: "Claim rewards instantly with zero gas fees. Our paymaster sponsors all your transactions.",
  },
  {
    icon: Shield,
    title: "Secure & Trustless",
    description: "Built on Base blockchain with battle-tested smart contracts and security best practices.",
  },
  {
    icon: Sparkles,
    title: "Gasless Experience",
    description: "Never worry about gas fees again. Focus on earning rewards while we handle the costs.",
  },
  {
    icon: Lock,
    title: "Non-Custodial",
    description: "You always maintain full control of your assets. We never have access to your funds.",
  },
  {
    icon: TrendingUp,
    title: "Growing Rewards",
    description: "Earn more as you participate. Daily bonuses, achievements, and referral rewards available.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-12 sm:py-16 md:py-20 bg-muted/30">
      <div className="container px-4">
        <div className="mb-8 sm:mb-12 text-center">
          <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-balance">
            Why Choose GaslessRewards
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
            Experience the future of blockchain rewards with cutting-edge technology and user-friendly design.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="border-border/50 hover:border-primary/50 transition-colors">
              <CardHeader className="pb-3 sm:pb-4">
                <div className="mb-2 sm:mb-3 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-primary/10">
                  <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <CardTitle className="text-base sm:text-lg md:text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="leading-relaxed text-xs sm:text-sm md:text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
