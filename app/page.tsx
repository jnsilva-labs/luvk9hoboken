import Hero from "@/components/sections/Hero";
import SEAPhilosophy from "@/components/sections/SEAPhilosophy";
import FoundersStory from "@/components/sections/FoundersStory";
import RescueDogs from "@/components/sections/RescueDogs";
import ServicesOverview from "@/components/sections/ServicesOverview";
import PhotoGallery from "@/components/sections/PhotoGallery";
import Testimonials from "@/components/sections/Testimonials";
import CommunityImpact from "@/components/sections/CommunityImpact";
import SeasonalCTA from "@/components/sections/SeasonalCTA";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <SEAPhilosophy />
      <FoundersStory />
      <RescueDogs />
      <ServicesOverview />
      <PhotoGallery />
      <Testimonials />
      <CommunityImpact />
      <SeasonalCTA />
      <Footer />
    </>
  );
}
