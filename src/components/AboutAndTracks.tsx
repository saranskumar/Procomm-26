"use client";

import { Cpu, Lock, Network, Radio, Server } from "lucide-react";

export default function AboutAndTracks() {
  const tracks = [
    {
      title: "5G/6G & Next-Gen Wireless",
      icon: Radio,
      desc: "Architectures, protocols, routing, beamforming, and next-generation networks.",
    },
    {
      title: "IoT & Smart Systems",
      icon: Cpu,
      desc: "Sensor nodes, energy harvesting, edge nodes, and smart city architectures.",
    },
    {
      title: "Network Security & Cryptography",
      icon: Lock,
      desc: "Information security, cryptography, secure hardware design, and protocol audits.",
    },
    {
      title: "AI & ML in Communications",
      icon: Server,
      desc: "Signal processing optimization, predictive routing, anomaly detection, and radio resource allocation.",
    },
    {
      title: "Optical & Satellite Communications",
      icon: Network,
      desc: "Fiber optics, high-throughput satellites, constellation management, and deep-space networking.",
    },
  ];

  return (
    <section id="about" className="w-full bg-retro-cream py-20 px-6 border-b-[3px] border-retro-brown select-none">
      <div className="max-w-7xl mx-auto">
        
        {/* About Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          <div className="lg:col-span-5">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-retro-brown/70">
              [ Competition Overview ]
            </span>
            <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-retro-brown mt-3 leading-tight">
              About PROCOMM &apos;26
            </h2>
            <div className="w-20 h-1 bg-retro-brown mt-6" />
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6">
            <p className="font-outfit text-base md:text-lg text-retro-brown/95 leading-relaxed font-medium">
              PROCOMM is the signature Communications Project Competition hosted by the IEEE ComSoc Kerala Chapter and IEEE Kerala Section. It aims to bridge the gap between academic study and industrial design by challenging engineering students to solve practical telecommunication challenges.
            </p>
            <p className="font-outfit text-sm md:text-base text-retro-brown/80 leading-relaxed">
              Teams present working prototypes, simulation models, or architectural implementations of cutting-edge networking systems. Winners receive prestigious IEEE laurels, cash grants, and mentorship opportunities.
            </p>
          </div>
        </div>

        {/* Tracks Section */}
        <div id="tracks" className="border-t-2 border-retro-brown/15 pt-20">
          <div className="text-center mb-16">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-retro-brown/70">
              [ Design Categories ]
            </span>
            <h2 className="font-syne text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-retro-brown mt-3">
              Competition Tracks
            </h2>
            <p className="font-outfit text-xs sm:text-sm text-retro-brown/80 mt-2 max-w-lg mx-auto">
              Innovative submissions are accepted across these focal pillars of communications technology.
            </p>
          </div>

          {/* Tracks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tracks.map((track, idx) => {
              const Icon = track.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-retro-white border-2 border-retro-brown rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-[3px_3px_0px_#5d3a1a] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#5d3a1a] transition-all"
                >
                  <div>
                    {/* Icon container */}
                    <div className="w-12 h-12 bg-retro-cream border-2 border-retro-brown rounded-xl flex items-center justify-center text-retro-brown mb-6">
                      <Icon className="w-6 h-6 stroke-[1.8]" />
                    </div>

                    <h3 className="font-syne text-lg font-bold text-retro-brown tracking-tight leading-snug">
                      {track.title}
                    </h3>

                    <p className="font-outfit text-xs md:text-sm text-retro-brown/85 leading-relaxed mt-4">
                      {track.desc}
                    </p>
                  </div>

                  <div className="mt-8 font-mono text-[10px] font-bold text-retro-brown/50 uppercase tracking-widest">
                    Track {idx + 1}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
