import { TrendingUp, Users, Zap, Award } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: "50K+",
    label: "Active Users",
  },
  {
    icon: Zap,
    value: "1M+",
    label: "Gasless Transactions",
  },
  {
    icon: Award,
    value: "$2.5M",
    label: "Rewards Claimed",
  },
  {
    icon: TrendingUp,
    value: "99.9%",
    label: "Success Rate",
  },
]

export function StatsSection() {
  return (
    <section className="py-10 sm:py-12 md:py-16 border-y border-border/40 bg-muted/30">
      <div className="container px-4">
        <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center">
              <div className="mb-2 sm:mb-3 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-primary/10">
                <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
