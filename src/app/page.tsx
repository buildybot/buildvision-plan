import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import OpenEvidenceParallel from "@/components/sections/OpenEvidenceParallel";
import HowItWorks from "@/components/sections/HowItWorks";
import LeadRouting from "@/components/sections/LeadRouting";
import FreeTools from "@/components/sections/FreeTools";
import RevenueModel from "@/components/sections/RevenueModel";
import Licensing from "@/components/sections/Licensing";
import CompetitiveMoat from "@/components/sections/CompetitiveMoat";
import Roadmap from "@/components/sections/Roadmap";
import CompetitiveLandscape from "@/components/sections/CompetitiveLandscape";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <div className="section-divider" />
      <Problem />
      <div className="section-divider" />
      <OpenEvidenceParallel />
      <div className="section-divider" />
      <HowItWorks />
      <div className="section-divider" />
      <LeadRouting />
      <div className="section-divider" />
      <FreeTools />
      <div className="section-divider" />
      <RevenueModel />
      <div className="section-divider" />
      <Licensing />
      <div className="section-divider" />
      <CompetitiveMoat />
      <div className="section-divider" />
      <Roadmap />
      <div className="section-divider" />
      <CompetitiveLandscape />
      <div className="section-divider" />
      <Footer />
    </main>
  );
}
