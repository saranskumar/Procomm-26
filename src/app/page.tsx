"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Info, MapPin, MessageSquare, ArrowRight } from "lucide-react";
import IntroLoader from "@/components/IntroLoader";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("procomm26_intro_loaded");
    if (hasLoaded === "true") {
      setLoading(false);
    }
  }, []);

  const handleLoaderComplete = () => {
    sessionStorage.setItem("procomm26_intro_loaded", "true");
    setLoading(false);
  };

  const portalCards = [
    {
      title: "About the Event",
      description: "Learn about the mission of PROCOMM '26 and browse the 5 design tracks spanning next-gen networking, AI, IoT, and security.",
      href: "/about",
      icon: Info,
      actionText: "Read Overview",
    },
    {
      title: "Venue & Host",
      description: "Saintgits College of Engineering (Autonomous), Kottayam, Kerala has been finalized as the host venue for PROCOMM '26. View maps, facilities, and team guides.",
      href: "/venue",
      icon: MapPin,
      actionText: "Venue Details",
    },
    {
      title: "Inquiries & Contact",
      description: "Do you have questions about team registrations, project submissions, rules, or sponsorship opportunities? Reach our team.",
      href: "/contact",
      icon: MessageSquare,
      actionText: "Get in Touch",
    },
  ];

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <IntroLoader key="loader" onComplete={handleLoaderComplete} />
        )}
      </AnimatePresence>

      {!loading && (
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            
            {/* Hero Section */}
            <Hero />

            {/* Subpages Quick Portal Grid */}
            <section className="bg-retro-cream py-20 px-6 border-b-[3px] border-retro-brown">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-retro-brown/70">
                    [ Navigation Portal ]
                  </span>
                  <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-retro-brown mt-3">
                    Explore PROCOMM &apos;26
                  </h2>
                  <p className="font-outfit text-xs sm:text-sm text-retro-brown/80 mt-2 max-w-lg mx-auto">
                    Review specific guidelines and register through our dedicated subpages.
                  </p>
                </div>

                {/* Portals Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {portalCards.map((card, idx) => {
                    const Icon = card.icon;
                    return (
                      <div 
                        key={idx}
                        className="bg-retro-white border-[3px] border-retro-brown rounded-[24px] p-6 sm:p-8 flex flex-col justify-between shadow-[4px_4px_0px_rgba(93,58,26,0.15)] hover:shadow-[6px_6px_0px_rgba(93,58,26,0.15)] hover:-translate-y-1 transition-all"
                      >
                        <div>
                          {/* Portal Header */}
                          <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 rounded-lg bg-retro-cream border-2 border-retro-brown flex items-center justify-center text-retro-brown">
                              <Icon className="w-5 h-5 stroke-[1.8]" />
                            </div>
                            <h3 className="font-syne text-lg font-bold text-retro-brown tracking-tight">
                              {card.title}
                            </h3>
                          </div>

                          <p className="font-outfit text-xs sm:text-sm text-retro-brown/80 leading-relaxed">
                            {card.description}
                          </p>
                        </div>

                        {/* CTA Link button */}
                        <div className="mt-8 pt-4 border-t border-retro-brown/10">
                          <Link 
                            href={card.href}
                            className="inline-flex items-center gap-2 font-syne text-[11px] font-extrabold tracking-widest text-retro-brown uppercase hover:underline"
                          >
                            <span>{card.actionText}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            </section>

          </main>
          <Footer />
        </div>
      )}
    </>
  );
}
