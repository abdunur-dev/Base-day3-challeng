import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { RewardsSection } from "@/components/rewards-section"
import { FeaturesSection } from "@/components/features-section"
import { StatsSection } from "@/components/stats-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <RewardsSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  )
}
