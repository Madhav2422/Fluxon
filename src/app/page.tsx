import CTAMain from "@/components/CTASection/CtaMain";
import FeaturedServices from "@/components/FeaturedServices/FeaturedServices";
import HeroMain from "@/components/HeroSection/HeroMain";
import StatsMain from "@/components/Stats/StatsMain";

export default function Home() {
  return (
    <>
      <HeroMain />
      <StatsMain/>
      <FeaturedServices/>
      <CTAMain/>
    </>
  )
}