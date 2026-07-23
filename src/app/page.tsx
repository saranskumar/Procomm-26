"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import confetti from "canvas-confetti";
import { 
  Calendar, MapPin, Trophy, Award, Users, Info, ShieldCheck, 
  ArrowRight, Briefcase, Zap, Cpu, Code, BookOpen 
} from "lucide-react";
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

  const handleDownloadRulebook = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      colors: ["#5d3a1a", "#e3d5c1", "#ffffff"]
    });
    alert("Downloading PROCOMM '26 Official Rulebook PDF...");
  };

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
          <main className="flex-grow select-none bg-retro-cream">
            
            {/* 1. Hero (Countdown, theme, Register CTA) */}
            <Hero />

            {/* 2. Event Highlights */}
            <section className="py-12 border-b-[3px] border-retro-brown bg-retro-white">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-6 gap-6 text-center select-text">
                  
                  <div className="flex flex-col items-center p-4 border border-retro-brown/10 rounded-xl">
                    <Calendar className="w-6 h-6 text-retro-brown mb-2" />
                    <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-retro-brown/60">Date</span>
                    <span className="font-syne text-xs sm:text-sm font-extrabold text-retro-brown mt-1">Oct 28-29, 2026</span>
                  </div>

                  <div className="flex flex-col items-center p-4 border border-retro-brown/10 rounded-xl">
                    <MapPin className="w-6 h-6 text-retro-brown mb-2" />
                    <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-retro-brown/60">Venue</span>
                    <span className="font-syne text-[10px] sm:text-xs font-extrabold text-retro-brown mt-1 leading-tight">Saintgits College, Kottayam</span>
                  </div>

                  <div className="flex flex-col items-center p-4 border border-retro-brown/10 rounded-xl">
                    <ShieldCheck className="w-6 h-6 text-retro-brown mb-2" />
                    <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-retro-brown/60">Deadline</span>
                    <span className="font-syne text-xs sm:text-sm font-extrabold text-retro-brown mt-1">Oct 15, 2026</span>
                  </div>

                  <div className="flex flex-col items-center p-4 border border-retro-brown/10 rounded-xl">
                    <Users className="w-6 h-6 text-retro-brown mb-2" />
                    <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-retro-brown/60">Eligibility</span>
                    <span className="font-syne text-xs sm:text-sm font-extrabold text-retro-brown mt-1">UG / PG Students</span>
                  </div>

                  <div className="flex flex-col items-center p-4 border border-retro-brown/10 rounded-xl">
                    <Trophy className="w-6 h-6 text-retro-brown mb-2" />
                    <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-retro-brown/60">Prize Pool</span>
                    <span className="font-syne text-xs sm:text-sm font-extrabold text-retro-brown mt-1">₹1,00,000+</span>
                  </div>

                  <div className="flex flex-col items-center p-4 border border-retro-brown/10 rounded-xl">
                    <Award className="w-6 h-6 text-retro-brown mb-2" />
                    <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-retro-brown/60">Organizers</span>
                    <span className="font-syne text-[10px] sm:text-xs font-extrabold text-retro-brown mt-1 leading-tight">IEEE ComSoc Kerala</span>
                  </div>

                </div>
              </div>
            </section>

            {/* 3. About PROCOMM */}
            <section className="py-20 px-6 border-b-[3px] border-retro-brown bg-retro-cream">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-5">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-retro-brown/70">[ Vision & Mission ]</span>
                  <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-retro-brown mt-3">
                    About PROCOMM
                  </h2>
                  <div className="w-20 h-1 bg-retro-brown my-6" />
                </div>
                
                <div className="lg:col-span-7 flex flex-col gap-6 select-text">
                  <p className="font-outfit text-base md:text-lg text-retro-brown/95 font-semibold">
                    PROCOMM is the signature Communications Project Competition designed to bridge the gap between student academic projects and real-world industrial systems engineering.
                  </p>
                  <p className="font-outfit text-sm sm:text-base text-retro-brown/80 leading-relaxed">
                    By challenging student teams to conceptualize, mock up, and present fully-fledged prototypes, PROCOMM aims to build a solid culture of product innovation in networking, wireless designs, and cybersecurity.
                  </p>
                  <Link 
                    href="/about" 
                    className="inline-flex items-center gap-2 font-syne text-xs font-black uppercase tracking-widest text-retro-brown border-b border-retro-brown pb-1 w-fit mt-2 hover:opacity-80"
                  >
                    <span>Read About Organizing Committee & History</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </section>

            {/* 4. Why Participate */}
            <section className="py-20 px-6 border-b-[3px] border-retro-brown bg-retro-white">
              <div className="max-w-7xl mx-auto">
                
                <div className="text-center mb-16">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-retro-brown/70">[ Competition Value ]</span>
                  <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-retro-brown mt-3">
                    Why Participate?
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 select-text">
                  
                  <div className="border-[2.5px] border-retro-brown rounded-2xl p-6 bg-retro-cream shadow-[3px_3px_0px_#5d3a1a]">
                    <Briefcase className="w-8 h-8 text-retro-brown mb-4" />
                    <h3 className="font-syne text-lg font-bold text-retro-brown">Industry Exposure</h3>
                    <p className="font-outfit text-xs sm:text-sm text-retro-brown/80 mt-2 leading-relaxed">
                      Present your engineering mockups directly to senior technologists and founders from premier hardware and software organizations.
                    </p>
                  </div>

                  <div className="border-[2.5px] border-retro-brown rounded-2xl p-6 bg-retro-cream shadow-[3px_3px_0px_#5d3a1a]">
                    <Users className="w-8 h-8 text-retro-brown mb-4" />
                    <h3 className="font-syne text-lg font-bold text-retro-brown">Mentorship & Networking</h3>
                    <p className="font-outfit text-xs sm:text-sm text-retro-brown/80 mt-2 leading-relaxed">
                      Shortlisted ideas will receive dedicated 1-on-1 industry mentor guidance to mature and polish technical layouts.
                    </p>
                  </div>

                  <div className="border-[2.5px] border-retro-brown rounded-2xl p-6 bg-retro-cream shadow-[3px_3px_0px_#5d3a1a]">
                    <Zap className="w-8 h-8 text-retro-brown mb-4" />
                    <h3 className="font-syne text-lg font-bold text-retro-brown">Recognition & Cash Prizes</h3>
                    <p className="font-outfit text-xs sm:text-sm text-retro-brown/80 mt-2 leading-relaxed">
                      Earn certificates of achievement from IEEE ComSoc, win cash grants from a ₹1,00,000+ pool, and secure university credits.
                    </p>
                  </div>

                </div>

              </div>
            </section>

            {/* 5. Competition Highlights */}
            <section className="py-20 px-6 border-b-[3px] border-retro-brown bg-retro-cream">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                <div className="lg:col-span-6 select-text">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-retro-brown/70">[ Domain Pillars ]</span>
                  <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-retro-brown mt-3">
                    Tracks Overview
                  </h2>
                  <p className="font-outfit text-sm sm:text-base text-retro-brown/85 leading-relaxed mt-4">
                    PROCOMM &apos;26 features 5 core tracks focused on telecom innovation: Wireless Networking, IoT Smart Systems, Network Security & Cryptography, AI/ML in Telecom, and Optical/Satellite Communications.
                  </p>
                  
                  <div className="flex gap-4 mt-6 font-mono text-xs font-bold text-retro-brown">
                    <span className="bg-retro-white border border-retro-brown px-3 py-1 rounded">5 Tracks</span>
                    <span className="bg-retro-white border border-retro-brown px-3 py-1 rounded">2 Jury Rounds</span>
                  </div>

                  <Link 
                    href="/competition"
                    className="inline-flex items-center gap-2 font-syne text-xs font-black uppercase tracking-widest text-retro-brown border-b border-retro-brown pb-1 w-fit mt-8 hover:opacity-80"
                  >
                    <span>Read Competition Guidelines & Guidelines</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="lg:col-span-6 grid grid-cols-2 gap-4">
                  {[
                    { title: "Wireless Systems", icon: Cpu },
                    { title: "Internet of Things", icon: Zap },
                    { title: "Cybersecurity", icon: ShieldCheck },
                    { title: "Telecom Code", icon: Code },
                  ].map((track, idx) => {
                    const Icon = track.icon;
                    return (
                      <div key={idx} className="bg-retro-white border-2 border-retro-brown rounded-xl p-4 flex flex-col items-start shadow-[2px_2px_0px_#5d3a1a]">
                        <Icon className="w-6 h-6 text-retro-brown mb-3" />
                        <h4 className="font-syne text-sm font-bold text-retro-brown">{track.title}</h4>
                      </div>
                    );
                  })}
                </div>

              </div>
            </section>

            {/* 6. Timeline Preview */}
            <section className="py-20 px-6 border-b-[3px] border-retro-brown bg-retro-white">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-retro-brown/70">[ Key Dates ]</span>
                  <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-retro-brown mt-3">
                    Roadmap Timeline
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto select-text">
                  {[
                    { date: "Oct 15, 2026", label: "Registration Closes", desc: "Complete form submissions and details." },
                    { date: "Oct 18, 2026", label: "Proposal Shortlist", desc: "Notification of teams advancing to final round." },
                    { date: "Oct 28-29, 2026", label: "Grand Finale", desc: "Physical prototype evaluation at Saintgits College." },
                  ].map((step, idx) => (
                    <div key={idx} className="border-2 border-retro-brown rounded-xl p-6 bg-retro-cream relative">
                      <div className="absolute top-[-12px] left-4 bg-retro-brown text-retro-cream px-2 py-0.5 text-[9px] font-mono font-bold uppercase rounded">
                        Phase 0{idx + 1}
                      </div>
                      <div className="font-mono text-xs font-extrabold text-retro-brown">{step.date}</div>
                      <h3 className="font-syne text-base font-bold text-retro-brown mt-2">{step.label}</h3>
                      <p className="font-outfit text-xs text-retro-brown/70 mt-1">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 7. Prize Pool Preview */}
            <section className="py-20 px-6 border-b-[3px] border-retro-brown bg-retro-cream text-center">
              <div className="max-w-4xl mx-auto select-text">
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-retro-brown/70">[ Rewards ]</span>
                
                <h2 className="font-syne text-3xl sm:text-5xl font-extrabold tracking-tight text-retro-brown mt-3">
                  ₹1,00,000+ Prize Pool
                </h2>

                <p className="font-outfit text-sm sm:text-base text-retro-brown/80 mt-4 max-w-lg mx-auto">
                  Cash grants awarded to top innovations, including Winners, Runners-up, and special category recognitions.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
                  <div className="bg-retro-white border-2 border-retro-brown rounded-xl p-6 shadow-[3px_3px_0px_#5d3a1a]">
                    <div className="font-mono text-[9px] font-bold text-retro-brown/50 uppercase tracking-widest">First Prize</div>
                    <div className="font-syne text-2xl font-black text-retro-brown mt-1">₹50,000</div>
                  </div>
                  <div className="bg-retro-white border-2 border-retro-brown rounded-xl p-6 shadow-[3px_3px_0px_#5d3a1a]">
                    <div className="font-mono text-[9px] font-bold text-retro-brown/50 uppercase tracking-widest">Second Prize</div>
                    <div className="font-syne text-2xl font-black text-retro-brown mt-1">₹30,000</div>
                  </div>
                  <div className="bg-retro-white border-2 border-retro-brown rounded-xl p-6 shadow-[3px_3px_0px_#5d3a1a]">
                    <div className="font-mono text-[9px] font-bold text-retro-brown/50 uppercase tracking-widest">Innovation Award</div>
                    <div className="font-syne text-2xl font-black text-retro-brown mt-1">₹20,000</div>
                  </div>
                </div>
              </div>
            </section>

            {/* 8. Sponsors & Partners Preview */}
            <section className="py-20 px-6 border-b-[3px] border-retro-brown bg-retro-white">
              <div className="max-w-7xl mx-auto">
                
                <div className="text-center mb-12">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-retro-brown/70">[ Endorsements ]</span>
                  <h2 className="font-syne text-2xl sm:text-3xl font-extrabold tracking-tight text-retro-brown mt-3">
                    Organizing Committee & Hosts
                  </h2>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-12 opacity-80">
                  <div className="flex flex-col items-center">
                    <span className="font-syne text-base font-black tracking-widest text-retro-brown">IEEE ComSoc</span>
                    <span className="font-mono text-[8px] tracking-wider uppercase text-retro-brown/50">Kerala Chapter</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-syne text-base font-black tracking-widest text-retro-brown">IEEE KERALA</span>
                    <span className="font-mono text-[8px] tracking-wider uppercase text-retro-brown/50">Section</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-syne text-base font-black tracking-widest text-retro-brown">SAINTGITS</span>
                    <span className="font-mono text-[8px] tracking-wider uppercase text-retro-brown/50">College of Engineering</span>
                  </div>
                </div>

              </div>
            </section>

            {/* 9. Final CTA */}
            <section className="py-20 px-6 bg-retro-cream text-center">
              <div className="max-w-2xl mx-auto">
                
                <h2 className="font-syne text-3xl sm:text-5xl font-extrabold tracking-tight text-retro-brown leading-tight select-text">
                  Is Your Project Ready?
                </h2>
                
                <p className="font-outfit text-sm sm:text-base text-retro-brown/80 mt-4 max-w-md mx-auto">
                  Submit your registration today and pitch your prototype at the flagship IEEE Communications Project Competition.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/register"
                    className="w-full sm:w-auto px-8 py-4 bg-retro-brown hover:bg-retro-brown/95 text-retro-white font-syne text-xs sm:text-sm font-extrabold tracking-widest rounded uppercase shadow-[4px_4px_0px_#e3d5c1] hover:shadow-[2px_2px_0px_#e3d5c1] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer border border-transparent"
                  >
                    Register Now
                  </Link>
                  <button
                    onClick={handleDownloadRulebook}
                    className="w-full sm:w-auto px-8 py-4 border-2 border-retro-brown bg-retro-white text-retro-brown font-syne text-xs sm:text-sm font-extrabold tracking-widest rounded uppercase hover:bg-retro-cream transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4" />
                    Download Rulebook
                  </button>
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
