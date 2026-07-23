"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, Info, Compass, ShieldCheck, GraduationCap, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export default function VenuePage() {
  const facilities = [
    {
      title: "Saintgits Grand Auditorium",
      description: "A state-of-the-art main auditorium with advanced acoustic treatment, digital projection systems, and a seating capacity for over 500 attendees.",
      details: "Centralized A/C • Dual Projector Setup • Technical Control Room",
    },
    {
      title: "Advanced ECE Design Labs",
      description: "Equipped with high-performance logic analyzers, Software Defined Radio (SDR) platforms, and gigabit fiber connections for project demonstrations.",
      details: "Gigabit Ethernet • Power Backup • Advanced Oscilloscopes",
    },
    {
      title: "Discussion & Breakout Rooms",
      description: "Spacious interactive presentation rooms for team preparation, jury assessments, and peer networking sessions.",
      details: "Whiteboards • LED Presentation Panels • High-speed Wi-Fi",
    },
    {
      title: "Hospitality & Dining Support",
      description: "On-campus guest house lodging for long-distance teams, dedicated dining areas, and catering arrangements for all participants.",
      details: "Veg & Non-Veg Catering • Guest Rooms • Medical Room on standby",
    },
  ];

  const travelGuides = [
    {
      mode: "By Rail",
      dest: "Kottayam Railway Station (KTYM)",
      dist: "~11 km away (approx. 20-25 mins drive via KK Road / MC Road).",
    },
    {
      mode: "By Air",
      dest: "Cochin International Airport (COK)",
      dist: "~90 km away (approx. 2.5 hours drive to the campus).",
    },
    {
      mode: "By Bus",
      dest: "Kottayam KSRTC Bus Stand",
      dist: "~12 km away. Local buses heading towards Changanassery stop at Pathamuttom.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-retro-cream select-none">
        
        {/* Banner Section */}
        <section className="relative w-full py-16 px-6 border-b-[3px] border-retro-brown text-center retro-grid-bg">
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-4"
            >
              <span className="bg-retro-brown text-retro-cream px-4 py-1.5 text-xs sm:text-sm font-extrabold tracking-widest uppercase rounded-full border border-retro-brown shadow-sm">
                OFFICIAL EVENT VENUE
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="retro-text-3d text-4xl sm:text-6xl md:text-[68px] leading-tight select-text"
            >
              VENUE FINALISED
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-syne text-sm sm:text-base md:text-xl font-bold tracking-wider text-retro-brown uppercase mt-6 max-w-3xl select-text"
            >
              Saintgits College of Engineering (Autonomous), Kottayam, Kerala
            </motion.p>
          </div>
        </section>

        {/* About Host Section */}
        <section className="py-16 px-6 border-b-[3px] border-retro-brown">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 flex flex-col gap-4">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-retro-brown/70 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 stroke-[2]" />
                [ The Host Institution ]
              </span>
              <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-retro-brown select-text">
                Saintgits College of Engineering
              </h2>
              <div className="w-20 h-1 bg-retro-brown my-2" />
              <p className="font-outfit text-sm sm:text-base text-retro-brown/85 leading-relaxed select-text">
                Established in 2002, Saintgits College of Engineering (Autonomous) has carved a niche for itself as a pioneer in engineering and management education. Located at Pathamuttom, Kottayam, the college is globally recognized for its exceptional academic rigor, research ecosystem, and industry collaborations.
              </p>
            </div>

            <div className="lg:col-span-7">
              {/* Double Border Card displaying campus description */}
              <div className="bg-retro-white border-[3px] border-retro-brown rounded-[24px] p-6 sm:p-8 shadow-[5px_5px_0px_rgba(93,58,26,0.1)] relative">
                <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-retro-brown" />
                <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-retro-brown" />
                <div className="absolute bottom-3 left-3 w-2 h-2 rounded-full bg-retro-brown" />
                <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-retro-brown" />
                
                <h3 className="font-syne text-base font-bold text-retro-brown flex items-center gap-2 mb-4">
                  <Info className="w-5 h-5 stroke-[2]" />
                  Venue Announcement Notes
                </h3>
                <p className="font-outfit text-xs sm:text-sm text-retro-brown/80 leading-relaxed select-text">
                  After a comprehensive multi-stage evaluation of campus infrastructures, technical laboratories, and team hospitality provisions across various engineering institutions in Kerala, Saintgits College of Engineering has been chosen to host the Grand Finale of PROCOMM &apos;26. The organizing committee is proud to collaborate with Saintgits to deliver an outstanding event experience for all participants.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Infrastructure Highlights */}
        <section className="py-20 px-6 border-b-[3px] border-retro-brown bg-retro-cream">
          <div className="max-w-7xl mx-auto">
            
            <div className="text-center mb-16">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-retro-brown/70">
                [ Venue Specifications ]
              </span>
              <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-retro-brown">
                Infrastructure Highlights
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {facilities.map((fac, idx) => (
                <div 
                  key={idx}
                  className="bg-retro-white border-2 border-retro-brown rounded-2xl p-6 sm:p-8 shadow-[3px_3px_0px_#5d3a1a] flex flex-col justify-between"
                >
                  <div>
                    <h3 className="font-syne text-lg font-bold text-retro-brown tracking-tight flex items-center gap-2 select-text">
                      <span className="w-6 h-6 rounded bg-retro-cream border border-retro-brown flex items-center justify-center font-mono text-xs text-retro-brown">
                        0{idx + 1}
                      </span>
                      {fac.title}
                    </h3>
                    <p className="font-outfit text-xs sm:text-sm text-retro-brown/80 leading-relaxed mt-4 select-text">
                      {fac.description}
                    </p>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-retro-brown/10 font-mono text-[10px] font-bold text-retro-brown/60 uppercase tracking-wider select-text">
                    {fac.details}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Map & Directions */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
              
              {/* Map Panel */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                
                {/* Styled Map frame */}
                <div className="w-full h-full min-h-[350px] bg-retro-white border-[3px] border-retro-brown rounded-[24px] overflow-hidden shadow-[5px_5px_0px_rgba(93,58,26,0.15)] relative flex items-center justify-center p-2">
                  {/* Clean SVG Drawing of Kottayam Location Route / Map sketch */}
                  <svg 
                    className="w-full h-full max-h-[400px] text-retro-brown" 
                    viewBox="0 0 500 350" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1.2"
                  >
                    {/* Outline grid */}
                    <line x1="50" y1="0" x2="50" y2="350" strokeDasharray="3 3" opacity="0.1" />
                    <line x1="150" y1="0" x2="150" y2="350" strokeDasharray="3 3" opacity="0.1" />
                    <line x1="250" y1="0" x2="250" y2="350" strokeDasharray="3 3" opacity="0.1" />
                    <line x1="350" y1="0" x2="350" y2="350" strokeDasharray="3 3" opacity="0.1" />
                    <line x1="450" y1="0" x2="450" y2="350" strokeDasharray="3 3" opacity="0.1" />
                    <line x1="0" y1="100" x2="500" y2="100" strokeDasharray="3 3" opacity="0.1" />
                    <line x1="0" y1="200" x2="500" y2="200" strokeDasharray="3 3" opacity="0.1" />
                    <line x1="0" y1="300" x2="500" y2="300" strokeDasharray="3 3" opacity="0.1" />

                    {/* Route line sketch */}
                    <path 
                      d="M 50,50 Q 150,60 220,150 T 380,250 T 480,220" 
                      fill="none" 
                      strokeWidth="2.5" 
                      strokeDasharray="5 4" 
                      opacity="0.8" 
                    />
                    <path 
                      d="M 220,150 Q 190,260 100,280" 
                      fill="none" 
                      strokeWidth="1.5" 
                      strokeDasharray="4 4" 
                      opacity="0.6" 
                    />

                    {/* Key locations */}
                    <circle cx="220" cy="150" r="8" className="fill-retro-brown" />
                    <circle cx="50" cy="50" r="5" className="fill-retro-white stroke-2 stroke-retro-brown" />
                    <circle cx="480" cy="220" r="5" className="fill-retro-white stroke-2 stroke-retro-brown" />

                    {/* Styled Pin Pointer over Saintgits */}
                    <path 
                      d="M 220 142 C 215 130, 225 120, 220 120 C 215 120, 225 130, 220 142 Z" 
                      fill="currentColor" 
                      className="animate-bounce" 
                    />
                    <circle cx="220" cy="130" r="2.5" fill="white" />

                    {/* Text overlays */}
                    <text x="35" y="38" className="font-mono text-[9px] font-extrabold" fill="currentColor">Kottayam City (~11km)</text>
                    <text x="210" y="112" className="font-syne text-[11px] font-extrabold" fill="currentColor">SAINTGITS</text>
                    <text x="380" y="210" className="font-mono text-[9px] font-extrabold" fill="currentColor">To Changanassery</text>
                  </svg>

                  {/* Absolute Card displaying coords */}
                  <div className="absolute bottom-4 right-4 bg-retro-cream border-2 border-retro-brown rounded-xl p-3 text-[10px] font-mono shadow-sm">
                    <span className="font-bold">Coords:</span> 9.5098° N, 76.5414° E
                  </div>
                </div>

              </div>

              {/* Travel Directions Panel */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-6">
                <div>
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-retro-brown/70 flex items-center gap-2">
                    <Compass className="w-4 h-4 stroke-[2]" />
                    [ Location & Travel Guide ]
                  </span>
                  
                  <h2 className="font-syne text-2xl sm:text-3xl font-extrabold tracking-tight text-retro-brown mt-3 select-text">
                    How to Reach
                  </h2>

                  <p className="font-outfit text-xs sm:text-sm text-retro-brown/80 leading-relaxed mt-4 select-text">
                    Saintgits College is located at Pathamuttom, Kottayam along the Kottayam-Changanassery corridor, making it highly accessible via MC Road.
                  </p>

                  {/* Directions items */}
                  <div className="flex flex-col gap-4 mt-6">
                    {travelGuides.map((guide, idx) => (
                      <div key={idx} className="border-b border-retro-brown/10 pb-3">
                        <div className="font-syne text-xs sm:text-sm font-extrabold text-retro-brown flex items-center gap-2 select-text">
                          <MapPin className="w-3.5 h-3.5 stroke-[2]" />
                          {guide.mode}: <span className="font-outfit font-medium text-retro-brown/85">{guide.dest}</span>
                        </div>
                        <p className="font-outfit text-[11px] sm:text-xs text-retro-brown/70 mt-1 select-text">
                          {guide.dist}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Google Maps link button */}
                <a
                  href="https://maps.google.com/?q=Saintgits+College+of+Engineering+Pathamuttom+Kottayam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-retro-brown hover:bg-retro-brown/95 text-retro-white font-syne text-xs font-extrabold tracking-widest rounded-xl uppercase retro-button-shadow flex items-center justify-center gap-2 cursor-pointer transition-transform"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open Google Maps
                </a>

              </div>

            </div>

          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
