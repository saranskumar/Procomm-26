"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import IntroLoader from "@/components/IntroLoader";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HostCTA from "@/components/HostCTA";
import AboutAndTracks from "@/components/AboutAndTracks";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If the user has already loaded this session, skip intro loader for convenience
    const hasLoaded = sessionStorage.getItem("procomm26_intro_loaded");
    if (hasLoaded === "true") {
      setLoading(false);
    }
  }, []);

  const handleLoaderComplete = () => {
    sessionStorage.setItem("procomm26_intro_loaded", "true");
    setLoading(false);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <IntroLoader key="loader" onComplete={handleLoaderComplete} />
        )}
      </AnimatePresence>

      {/* Main Page Layout */}
      {!loading && (
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Hero />
            <HostCTA />
            <AboutAndTracks />
            <ContactForm />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}
