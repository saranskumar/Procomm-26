"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import IntroLoader from "@/components/IntroLoader";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import WaveDivider from "@/components/WaveDivider";

import Highlights from "@/components/Highlights";
import AboutSection from "@/components/AboutSection";
import WhyParticipate from "@/components/WhyParticipate";
import TracksOverview from "@/components/TracksOverview";
import TimelineSection from "@/components/TimelineSection";
import PrizePool from "@/components/PrizePool";
import OrganizersList from "@/components/OrganizersList";
import FinalCTA from "@/components/FinalCTA";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isReload = false;
    if (typeof window !== "undefined" && window.performance) {
      const navEntries = window.performance.getEntriesByType("navigation");
      if (navEntries.length > 0) {
        isReload = (navEntries[0] as PerformanceNavigationTiming).type === "reload";
      } else if (window.performance.navigation) {
        isReload = window.performance.navigation.type === 1;
      }
    }

    if (isReload) {
      sessionStorage.removeItem("procomm26_intro_loaded");
      setLoading(true);
    } else {
      const hasLoaded = sessionStorage.getItem("procomm26_intro_loaded");
      if (hasLoaded === "true") setLoading(false);
    }
  }, []);

  const handleLoaderComplete = () => {
    sessionStorage.setItem("procomm26_intro_loaded", "true");
    setLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "var(--ivory)" }}>
      <AnimatePresence>
        {loading && <IntroLoader key="loader" onComplete={handleLoaderComplete} />}
      </AnimatePresence>
      <Header />
      <main className="flex-grow">
        {/* ── 1. Hero ── */}
        <Hero />

        {!loading && (
          <>
            {/* ── Wave: Hero → Highlights ── */}
            <WaveDivider fromColor="var(--ivory)" toColor="var(--paper)" />

            {/* ── 2. Event Highlights Strip ── */}
            <Highlights />

            {/* ── Wave: Highlights → About ── */}
            <WaveDivider fromColor="var(--paper)" toColor="var(--ivory)" flip />

            {/* ── 3. About PROCOMM ── */}
            <AboutSection />

            {/* ── Wave: About → Why ── */}
            <WaveDivider fromColor="var(--ivory)" toColor="var(--paper)" />

            {/* ── 4. Why Participate ── */}
            <WhyParticipate />

            {/* ── Wave: Why → Tracks ── */}
            <WaveDivider fromColor="var(--paper)" toColor="var(--ivory)" flip />

            {/* ── 5. Tracks Overview / Problem Statements ── */}
            <TracksOverview />

            {/* ── Wave: Tracks → Timeline ── */}
            <WaveDivider fromColor="var(--ivory)" toColor="var(--paper)" />

            {/* ── 6. Timeline ── */}
            <TimelineSection />

            {/* ── Wave: Timeline → Prizes ── */}
            <WaveDivider fromColor="var(--paper)" toColor="var(--ink-deep)" />

            {/* ── 7. Prize Pool ── */}
            <PrizePool />

            {/* ── Wave: Prizes → Organizers ── */}
            <WaveDivider fromColor="var(--ink-deep)" toColor="var(--paper)" />

            {/* ── 8. Organizing Committee ── */}
            <OrganizersList />

            {/* ── Wave: Organizers → CTA ── */}
            <WaveDivider fromColor="var(--paper)" toColor="var(--ink-deep)" flip />

            {/* ── 9. Final CTA ── */}
            <FinalCTA />
          </>
        )}
      </main>
      {!loading && <Footer />}
    </div>
  );
}
