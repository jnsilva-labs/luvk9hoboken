import Hero from "@/components/sections/Hero";
import SocialProof from "@/components/sections/SocialProof";
import FoundersStory from "@/components/sections/FoundersStory";
import DogsOfTheCourt from "@/components/sections/DogsOfTheCourt";
import ServicesOverview from "@/components/sections/ServicesOverview";
import InstagramCTA from "@/components/sections/InstagramCTA";
import Testimonials from "@/components/sections/Testimonials";
import SeasonalCTA from "@/components/sections/SeasonalCTA";
import Footer from "@/components/layout/Footer";
import SectionDivider from "@/components/animations/SectionDivider";

export default function Home() {
  return (
    <>
      <Hero />
      <SectionDivider />
      <SocialProof />
      <FoundersStory />
      <SectionDivider />
      <DogsOfTheCourt />
      <ServicesOverview />
      <SectionDivider />
      <InstagramCTA />
      <Testimonials />
      <SeasonalCTA />
      <Footer />
    </>
  );
}
